import { useEffect, useState, useContext } from "react";
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import styles from "./styles.module.scss"
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { MovieForm } from "../../components/MovieForm";

interface Seat {
  id: number;
  status: "free" | "selected" | "occupied";
}

interface Session {
  room: string;
  time: string;
}

function MovieSchedule() {
  const { user, cart, setCart, isMovieFormOpen, currentMovie } = useContext(AppContext);

  const [ seats, setSeats ] = useState<Seat[]>([]);
  const [ days, setDays ] = useState<string[]>([]);
  const [ selectedDay, setSelectedDay ] = useState<string>("");

  const [ selectedSession, setSelectedSession ] = useState<Session | null>(null);

  useEffect(() => {
    setDays([]);

    for (let i = 0; i < 4; i++) {
      setDays(oldValue => [...oldValue, `1${i}/06`]);
    }

    setSelectedDay("10/06");
  }, []);

  useEffect(() => {
    setSeats([]);

    for (let i = 1; i < 46; i++) {
      const isFree = Math.random() >= 0.3;

      setSeats(oldValue => [...oldValue, { id: i, status: isFree ? "free" : "occupied" }]);
    }
  }, [selectedDay]);

  function selectSession(session: Session) {
    if (selectedSession?.room === session.room && selectedSession?.time === session.time) {
      setSelectedSession(null);
      return;
    }

    setSelectedSession(session);
  }

  function selectSeat(seat: Seat) {
    if (seat.status === "free") {
      setSeats(oldValue => oldValue.map(seatItem => {
        if (seatItem.id === seat.id) {
          return { ...seatItem, status: "selected" };
        }

        return seatItem;
      }));
    }

    if (seat.status === "selected") {
      setSeats(oldValue => oldValue.map(seatItem => {
        if (seatItem.id === seat.id) {
          return { ...seatItem, status: "free" };
        }

        return seatItem;
      }));
    }
  }

  function isSeatSelected(seat: Seat) {
    return seat.status === "selected";
  }

  function isSeatOccupied(seat: Seat) {
    return seat.status === "occupied";
  }

  function isSessionSelected(session: Session) {
    return selectedSession?.room === session.room && selectedSession?.time === session.time;
  }

  function resetSelectedSeats() {
    setSeats(oldValue => oldValue.map(seat => {
      if (seat.status === "selected") {
        return { ...seat, status: "free" };
      }

      return seat;
    }));
  }

  function setCartItems() {
    if (user?.role === "manager" || user?.role === "func") {
      toast.error("Funcionários não podem comprar ingressos!");
      return;
    }

    toast.success("Ingresso adicionado ao carrinho com sucesso!");

    const alreadyInCart = cart.find(item => item.name === currentMovie?.nome);

    if (alreadyInCart) {
      setCart(oldValue => oldValue.map(item => {
        if (item.name === currentMovie?.nome) {
          return { ...item, quantity: item.quantity + seats.filter(seat => seat.status === "selected").length };
        }

        return item;
      }));
    } else {
      setCart(oldValue => [...oldValue, {
        name: currentMovie?.nome || "",
        price: 20,
        quantity: seats.filter(seat => seat.status === "selected").length,
        type: "movie"
      }]);
    }

    setSelectedSession(null);
    setSelectedDay("10/06");
    resetSelectedSeats();
  }

  return (
    <div className={styles.container}>
      {isMovieFormOpen && <MovieForm />}

      <Header />

      <div>
        <div className={styles.content}>
          <div className={styles.fieldMovieInfo}>
            <img src={currentMovie?.srcCapa} alt="" />

            <div>
              <h1>{currentMovie?.nome}</h1>
              <p>{currentMovie?.sinopse}</p>
              <span>{currentMovie?.faixaEtaria}</span>
            </div>
          </div>

          <div className={styles.fieldSchedule}>
            <h1 className={styles.titleSchedule}>Horários <span>{selectedSession ? `${selectedDay} | ${selectedSession?.room} - ${selectedSession?.time}` : ""}</span></h1>
            
            {
              !selectedSession && (
                <div className={styles.daysField}>
                  {
                    days.map((day, index) => (
                      <button
                        key={index}
                        className={`${styles.day} ${selectedDay === day ? styles.daySelected : ""}`}
                        onClick={() => setSelectedDay(day)}
                      >
                        {day}
                      </button>
                    ))
                  }
                </div>
              )
            }
            
            <div className={styles.separator} />
            
            {
              !selectedSession && (
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

                        {
                          ["10:00", "11:00", "12:00", "13:00"].map((time, index) => (
                            <button key={index} className={`${styles.hour} ${isSessionSelected({ room, time }) ? styles.hourSelected : ""}`} onClick={() => selectSession({room, time})}>
                              {time}
                            </button>
                          ))
                        }
                      </div>
                    ))
                  }
                </div>
              )
            }

            {
              selectedSession && (
                <div className={styles.fieldSeats}>
                  {seats.map((seat, index) => (
                    <button key={index} className={`${styles.seat} ${isSeatSelected(seat) ? styles.seatSelected : isSeatOccupied(seat) ? styles.seatOccupied : ""}`} onClick={() => selectSeat(seat)}>
                      {seat.id}
                    </button>
                  ))}
                  
                  <div className={styles.buttonNavigator}>
                    <button onClick={() => setSelectedSession(null)} className={styles.backButton}>Voltar</button>
                    <button onClick={() =>  setCartItems()} className={styles.continueButton}>Continuar</button>
                  </div>
                </div>
              )
            }
            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export { MovieSchedule }
