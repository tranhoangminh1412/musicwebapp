import * as React from "react";
import Image from "next/image";

import useDebounce from "@/hooks/useDebounce";

import IcEye from "@/assets/icons/IcEye";

export interface IInpTextFieldProps {
  type?: string;
  label?: string;
  value?: string;
  onChange: Function;
  placeholder?: string;
  className?: string;
  debounce?: number;
  children?: React.ReactElement;
  error?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
  icon?: any;
}

export default function InpTextField(props: IInpTextFieldProps) {
  const {
    type,
    label,
    value,
    onChange = () => {},
    placeholder,
    className = "",
    debounce = 0,
    children,
    error = false,
    errorMessage,
    autoFocus = false,
    icon = "",
  } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [valueLocal, setValueLocal] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [state, setState] = React.useState(false);

  const onFocusInput = () => {
    setFocus(true);
  };

  const onBlurInput = () => {
    setFocus(false);
    setState(true);
  };

  const emitEvent = useDebounce((e: string) => {
    onChange(e);
  }, debounce);

  const onValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValueLocal(e.target.value);
    emitEvent(e.target.value);
  };

  React.useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  React.useEffect(() => {
    if (value) {
      setValueLocal(value);
    }
  }, [value]);

  React.useEffect(()=> {
    if((type == "password") && valueLocal.length < 7){
    }
  },[])

  return (
    <div className={`input-textfield w-max min-w-[300px] ${className}`}>
      <div
        className={`input-textfield__box flex items-center py-4 relative `}
        style={{ transition: "all .35s ease" }}
      >
        {children &&
          React.cloneElement(children, {
            size: "16",
            color: "#757185",
            className: "mr-6",
          })}
        <>
          {icon && <Image src={icon} alt="" className="mr-[24px]" />}
          <input
            type={type === "password" && !showPassword ? "password" : "text"}
            ref={inputRef}
            value={valueLocal}
            placeholder={placeholder}
            className="text-grey bg-transparent border-none outline-none text-sm"
            style={{ flex: 1 }}
            onChange={onValueChange}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          />
          {type === "password" && (
            <IcEye
              show={showPassword}
              color="#757185"
              size="16"
              className="ml-2 show-eye"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </>

        <div
          className={`absolute h-[1px] w-full left-0 bottom-0 ${
            focus
              ? "bg-[#0094FF]"
              : error && state
              ? "bg-[#ee5253]"
              : `bg-[#757185]`
          }`}
          style={{ transition: "all .35s ease" }}
        ></div>
        {error && state ? (
          <p
            className="absolute h-[1px] w-full left-0 bottom-0 text-[10px] leading-[15px] text-[#ee5253]"
            style={{ transition: "all .35s ease" }}
          >
            Invalid field
          </p>
        ) : <></>}
      </div>
    </div>
  );
}
