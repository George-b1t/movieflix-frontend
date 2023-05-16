import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import styles from "./styles.module.scss"

function MovieSchedule() {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.content}>
        <div className={styles.fieldMovieInfo}>
          <img src="/movieTestImage.png" alt="" />

          <div>
            <h1>Guardiões da Galáxia</h1>
            <p>Agora já conhecidos como os Guardiões da Galáxia, os guerreiros viajam ao longo do cosmos e lutam para manter sua nova família unida. Enquanto isso tentam desvendar os mistérios da verdadeira paternidade de Peter Quill.</p>
            <span>16</span>
          </div>
        </div>

        <div className={styles.fieldSchedule}>
          <h1 className={styles.titleSchedule}>Horários</h1>
          <div className={styles.daysField}>
            <button className={styles.day}>16/06</button>
            <button className={styles.day}>17/06</button>
            <button className={styles.day}>18/06</button>
          </div>
          
          <div className={styles.separator} />
          
          <div className={styles.fieldRooms}>
            {
              [
                "Sala 1",
                "Sala 2",
                "Sala 3"
              ]
              .map((room, index) => (
                <div className={styles.roomSchedule} key={index}>
                  <p>{room}</p>
                  <div className={styles.roomSeparator} />
                  <button className={styles.hour}>14:00</button>
                  <button className={styles.hour}>15:00</button>
                  <button className={styles.hour}>16:00</button>
                  <button className={styles.hour}>17:00</button>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export { MovieSchedule }
