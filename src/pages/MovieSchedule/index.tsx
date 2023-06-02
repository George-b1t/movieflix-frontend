import { useEffect, useState, useContext } from "react";
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import styles from "./styles.module.scss"
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { MovieForm } from "../../components/MovieForm";
import { api } from "../../services/api";
import { DateForm } from "../../components/DateForm";
import { MovieProps } from "../Movie";

interface Seat {
  id: number;
  status: "free" | "selected" | "occupied";
}

interface Session {
  room: string;
  time: string;
}

interface SessionProps {
  sala: Room;
  filme: MovieProps;
  horarioSessao: string;
}

export interface Room {
  id: string;
  nome: string;
  capacidade: number;
}

function MovieSchedule() {
  const { user, cart, setCart, isMovieFormOpen, currentMovie, currentFilial, setIsDateFormOpen, isDateFormOpen, setCurrentRoom } = useContext(AppContext);

  const [ seats, setSeats ] = useState<Seat[]>([]);
  const [ days, setDays ] = useState<string[]>([]);
  const [ selectedDay, setSelectedDay ] = useState<string>("");

  const [ sessions, setSessions ] = useState<SessionProps[]>([]);

  const [ rooms, setRooms ] = useState<Room[]>([]);

  const [ selectedSession, setSelectedSession ] = useState<Session | null>(null);

  useEffect(() => {
    if (!currentMovie) {
      window.location.href = "/#/movies";
      return;
    }

    getSessions();

    getRooms();
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

  function getRooms() {
    api.get(`/sala/filial/${currentFilial?.id}`)
    .then(response => {
      setRooms(response.data);
    })
  }

  function addRoom() {
    api.post("/sala", {
      nome: `Sala ${rooms.length + 1}`,
      filialId: currentFilial?.id,
      capacidade: 45
    })
    .then(() => {
      toast.success("Sala adicionada com sucesso!");
      getRooms();
    })
  }

  function getTime(value: string) {
    return value.split("T")[1].split(":00")[0];
  }

  function getDay(value: string) {
    const dateWithoutFiveFirstCharacters = value.slice(5);
    const date = dateWithoutFiveFirstCharacters.split("T")[0].split("-").reverse().join("/");

    return date;
  }

  function getSessions() {
    api.get(`/sessao/${currentMovie?.id}`)
      .then(response => {
        setSessions(response.data);

        const findedDays: any = [];

        response.data.forEach((session: SessionProps) => {
          const dateWithoutFiveFirstCharacters = session.horarioSessao.slice(5);
          const date = dateWithoutFiveFirstCharacters.split("T")[0].split("-").reverse().join("/");

          const alreadyInArray = findedDays.find((day: string) => day === date);

          if (alreadyInArray) return;

          findedDays.push(date);
        });

        setSelectedDay(findedDays[0]);

        setDays(findedDays);
      })
  }

  return (
    <div className={styles.container}>
      {isMovieFormOpen && <MovieForm />}
      {isDateFormOpen && <DateForm callback={getSessions} />}

      <Header />

      <div>
        <div className={styles.content}>
          <div className={styles.fieldMovieInfo}>
            <img src={currentMovie?.srcCapa} alt="" />

            <div>
              <h1>{currentMovie?.nome}</h1>
              <p>{currentMovie?.sinopse}</p>
              <p>Diretor: <span>{currentMovie?.diretor}</span></p>
              <p>Dublado: <span>{currentMovie?.dublado ? "Sim" : "Não"}</span></p>
              <p>Nota: <span>{currentMovie?.nota}</span></p>
              <p>Lançamento: <span>{currentMovie?.dataLancamento.split("-").reverse().join("/")}</span></p>
              <span className={styles.faixaEtaria}>{currentMovie?.faixaEtaria}</span>
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
                        onClick={() => {
                          setSelectedDay(day);
                        }}
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
                    rooms.map((room, index) => (
                      <div className={styles.roomSchedule} key={index}>
                        <p>{room.nome}</p>
                        <div className={styles.roomSeparator} />

                        {
                          sessions.filter(item => item.sala.nome == room.nome).filter(item => getDay(item.horarioSessao) == selectedDay).map((time, index) => (
                            <button key={index} className={`${styles.hour} ${isSessionSelected({ room: room.nome, time: getTime(time.horarioSessao) }) ? styles.hourSelected : ""}`} onClick={() => selectSession({room: room.nome, time: getTime(time.horarioSessao)})}>
                              {getTime(time.horarioSessao)}
                            </button>
                          ))
                        }
                        {
                          (user?.role === "manager" || user?.role === "func") && (
                            <button onClick={() => {
                              setCurrentRoom(room);
                              setIsDateFormOpen(true)
                            }} className={styles.hour}>
                              +
                            </button>
                          )
                        }
                      </div>
                    ))
                  }

                  {
                    (user?.role === "manager" || user?.role === "func") && (
                      <button onClick={() => addRoom()} className={styles.addRoom}>
                        Adicionar Sala
                      </button>
                    )
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
