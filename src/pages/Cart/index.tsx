import styles from "./styles.module.scss"
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

function Cart(){
	const { cart, setCart } = useContext(AppContext);

	const [isPaying, setIsPaying] = useState(false);

	function changeQuantity(index: number, quantity: number) {
			if (quantity == 0) return;
			const newItems = [...cart];
			newItems[index].quantity = quantity;
			setCart(newItems);
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
										</div>
									</article>
								))
							}
							
							</section>

							<section className={styles.itensvalores}>

							<h2>{isPaying ? "Pagamento" : "Valores"}</h2>

							<article>
								{
									isPaying ? (
											<>
													<button className={styles.opcaoPagamento}>
															Pix
													</button>
													<button className={styles.opcaoPagamento}>
															Cartão de crédito
													</button>
											</>
									)
									: 
									(
										<>
											{cart.map((item, index) => (
												<>
													<div className={styles.itensingressos} key={index}>
														<h3>{item.name}</h3>
														<p>R$ {item.price * item.quantity}</p>
													</div>

													{index != (cart.length - 1) && <div className={styles.line} />}
												</>
											))}
										</>
									)
								}

							</article>

							{
								!isPaying && <button className={styles.payButton} onClick={() => setIsPaying(true)}>Continuar</button>
							}

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