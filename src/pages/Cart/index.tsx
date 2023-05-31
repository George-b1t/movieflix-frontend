import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

function Cart(){
	const { cart, setCart } = useContext(AppContext);

	const [ selectedPayment, setSelectedPayment ] = useState<"pix" | "creditCard" | null>(null);
	const [isPaying, setIsPaying] = useState(false);

	function changeQuantity(index: number, quantity: number) {
		if (quantity == 0) return;
		const newItems = [...cart];
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

	function onNextClick() {
		if (!isPaying) {
			setIsPaying(true);
			return;
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
												<p>Total:</p>
												<p>R$ {cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</p>
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