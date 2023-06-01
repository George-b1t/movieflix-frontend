import { Dispatch, useState } from "react";
import styles from "./styles.module.scss"

type DropdownProps = {
    title: string;
    items: string[];
    valueSetter: Dispatch<string>;
    exitAction: () => void;
    saveAction: () => void;
};

function Dropdown({ title, items, valueSetter, exitAction, saveAction }: DropdownProps) {
    const [itemsVisible, setItemsVisible] = useState(false);
    const [value, setValue] = useState('Selecione uma opção');

    const handleChange = (newValue: string) => {
        setValue(newValue);
        valueSetter(newValue);
        setItemsVisible(false);
    };

  return (
    <div className={styles.container}>
        <div className={styles.modal}>
            <p>{title}</p>
            <button onClick={() => {
                setItemsVisible(!itemsVisible);
            }}>{value}</button>
            <div className={styles.buttonsContainer}>
                <button onClick={exitAction}>Sair</button>
                <button onClick={saveAction}>salvar</button>
            </div>
            {itemsVisible && <div className={styles.itensContainer}>
                <button onClick={() => {
                    handleChange(`Selecione uma opção`);
                   }}>Selecione uma opção</button>
                {items.map((item, i) => {
                   return <button onClick={() => {
                    handleChange(`${item} ${i}`);
                   }}>{`${item} ${i}`}</button> 
                })}
            </div>}
        </div>
    </div>
  )
}

export { Dropdown }
