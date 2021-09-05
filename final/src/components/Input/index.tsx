import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { IconType } from 'react-icons/lib/esm';
import { useField } from '@unform/core';

import { Container } from './styles';

interface Props {
    icon?: IconType;
    name:string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props

export function Input({ name, icon: Icon, ...rest } : InputProps){

    const inputRef = useRef<HTMLInputElement>(null);

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isFilled, setIsFilled] = useState<boolean>(false);

    const { fieldName, defaultValue, registerField } = useField(name);

    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);
  
    const handleInputBlur = useCallback(() => {
      setIsFocused(false);
  
      setIsFilled(!!inputRef.current?.value);
    }, []);

    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });
    }, [fieldName, registerField]);

    return (
      <Container isFilled={isFilled} isFocused={isFocused}>
        {Icon && <Icon size={20} />}
  
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </Container>
    );
}
