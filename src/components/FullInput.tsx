import { ChangeEvent, useState } from "react"

export type FullInputPropsType = {
    addMessage: (title: string) => void;
}


export const FullInput = (props: FullInputPropsType ) => {

    let [title, setTitle] = useState("");

    
    const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        
    }
    
    const onClickButtonHandler  = () => {
      props.addMessage(title);
      setTitle('');
    }
    



    return (
        <div className="Btn">
            <input value = {title} onChange={onChangeInputHandler}/>
             <button onClick={onClickButtonHandler}>+</button>
        </div>
        
    )
}