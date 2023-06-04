import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { api } from "../../services/api";
import { toast } from "react-toastify";

function Cart(){
	const { cart, setCart, user, setUser } = useContext(AppContext);

	const [ selectedPayment, setSelectedPayment ] = useState<"pix" | "creditCard" | null>(null);
	const [isPaying, setIsPaying] = useState(false);

	const hasDiscount = (user?.pontos || 0) >= 32;
	const discount = hasDiscount ? Math.floor((user?.pontos || 0) / 32) : 0;

	const quantityOfIngressosOnCart = cart.reduce((acc, item) => acc + (item.type === "movie" ? (item.seats?.length || 0) : 0), 0);

	const realDiscount = discount >= quantityOfIngressosOnCart ? quantityOfIngressosOnCart : discount;

	const total = () => {
		const tempTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

		if (hasDiscount) {
			return tempTotal - (realDiscount * 20);
		}

		return tempTotal;
	};

	function changeQuantity(index: number, quantity: number) {
		if (quantity == 0) return;
		const newItems = [...cart];
		
		const item = newItems[index];

		if (item.type === "movie") return;

		newItems[index].quantity = quantity;
		setCart(newItems);
	}

	function removeItem(index: number) {
		const newItems = [...cart];
		newItems.splice(index, 1);
		setCart(newItems);
	}

	function selectPayment(payment: "pix" | "creditCard") {
		if (selectedPayment === payment) {
			setSelectedPayment(null);
			return;
		}

		setSelectedPayment(payment);
	}

	function onBackButton() {
		if (isPaying && !selectedPayment) {
			setIsPaying(false);
			return;
		}
		if (isPaying && selectedPayment) {
			setSelectedPayment(null);
			return;
		}
	}

	async function onNextClick() {
		if (!user) {
			toast.info("Você precisa estar logado para comprar");
			return
		}

		if (!isPaying) {
			setIsPaying(true);
			return;
		}

		if (isPaying && selectedPayment) {
			const productsIdsList: any = []
			
			cart.forEach(item => {
				if (item.type === "snack") {
					for (let i = 0; i < item.quantity; i++) {
						productsIdsList.push(item.productId);
					}
				}
			})

			await api.post("/compra", {
				usuarioId: user?.cpf,
				produtosId: productsIdsList,
			})
			.then(async (res) => {
				for (let i =0; i < cart.length; i++) {
					const item = cart[i];

					if (item.type === "movie" && item.seats) {
						for (let j = 0; j < item.seats?.length; j++) {
							await api.post("/reserva", {
								cadeira: item.seats[j],
								compraId: res.data.id,
								sessaoId: cart[i].sessionId,
							})
						}
					}
				}
			})

			const points = Math.floor(total() / 5);

			api.post(`/usuario/${user?.cpf}/pontos/${points}?calculo=sum`)
				.then(res => {
					setUser(res.data);

					toast.success("Compra realizada com sucesso");
					toast.success(`Você ganhou ${points} pontos`);

					if (hasDiscount) {
						api.post(`/usuario/${user?.cpf}/pontos/${realDiscount * 32}?calculo=sub`)
							.then(res => {
								setUser(res.data);
							})
					}
				})

			setCart([]);
			setIsPaying(false);
			setSelectedPayment(null);
		}
	}

	return (
			<div className={styles.container}>
				<Header />

				<div className={styles.cart}>
					{
						cart.length == 0 ? (
							<h1 className={styles.emptyCart}>Seu carrinho está vazio</h1>
						) : (
							<div className={styles.carrinho}>
							
							<section className={styles.itenscarrinho}>
							<h2>Meu carrinho</h2>

							{
								cart.map((item, index) => (
									<article key={index}>
										<p>{item.name}</p>
										<div className={styles.quantidade}>
											<p>Qtd:</p>
											<input type="number" value={item.quantity} onChange={(e) => changeQuantity(index, Number(e.target.value))} />
											<button onClick={() => removeItem(index)}>Excluir</button>
										</div>
									</article>
								))
							}
							
							</section>

							<section className={styles.itensvalores}>

							<h2>{isPaying ? "Pagamento" : "Valores"}</h2>

							<article>
								<p className={styles.memberMessage}>A cada 32 pontos você ganha 1 ingresso!</p>
								{
									isPaying && !selectedPayment && (
											<>
													<button
														onClick={() => selectPayment("pix")}
														className={styles.opcaoPagamento}
													>
															Pix
													</button>
													<button
														onClick={() => selectPayment("creditCard")}
														className={styles.opcaoPagamento}
													>
															Cartão de crédito
													</button>
											</>
									)
								}
								{
									!isPaying && (
										<>
											{cart.map((item, index) => (
												<>
													<div className={styles.itensingressos} key={index}>
														<h3>{item.name}</h3>
														<p>R$ {item.price * item.quantity}</p>
													</div>

													<div className={styles.line} />
												</>
											))}

											<div className={styles.total}>
												<p>Meus pontos: </p>
												<p>{user?.pontos}</p>
											</div>

											{
												hasDiscount && (
													<div className={styles.total}>
														<p>Ingressos grátis: </p>
														<p>{discount}</p>
													</div>
												)
											}
											<div className={styles.total}>
												<p>Total:</p>
												<p>R$ {total()}</p>
											</div>
										</>
									)
								}

								{
									isPaying && selectedPayment == "creditCard" && (
										<div className={styles.creditCard}>
											<input type="text" placeholder="Nome do titular" />
											<input type="text" placeholder="Número do cartão" />
											<input type="text" placeholder="Validade" />
											<input type="text" placeholder="CVV" />
										</div>
									)
								}

								{
									isPaying && selectedPayment == "pix" && (
										<div className={styles.pix}>
											<img src="/qr_code_barcode.jpg" alt="" />
										</div>
									)
								}

								<div className={styles.buttonNavigator}>
                  <button
										onClick={() => onBackButton()}
										className={styles.backButton}
										style={isPaying && !selectedPayment ? { width: "100%" } : {}}
									>
											Voltar
									</button>
                  {!(isPaying && !selectedPayment) && (
									<button
										onClick={() => onNextClick()}
										className={styles.continueButton}
									>
											Continuar
										</button>
									)}
                </div>
							</article>

							</section>
						</div>
						)
					}

				</div>

				<Footer />
		</div>
	)
}

export {Cart}