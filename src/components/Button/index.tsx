import React,{ButtonHTMLAttributes} from 'react';
import { Btn } from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function Button(props: ButtonProps ){
    return (
       <Btn {...props}/>
    );
};

export default Button;
