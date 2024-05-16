import * as React from "react";
import Image from "next/image";

import useDebounce from "@/hooks/useDebounce";

import IcEye from "@/assets/icons/IcEye";

export interface IInpTextFieldProps {
  type?: string;
  field?: string;
  value?: string;
  onChange: any;
  placeholder?: string;
  className?: string;
  debounce?: number;
  children?: React.ReactElement;
  error?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
  icon?: any;
  maxLength?: number;
  setParentInput?: any;
  inputClasses?: string;
  setParentState?: any;
  textAllowContinue?: boolean;
  handleKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

export default function InpTextField(props: IInpTextFieldProps) {
  const {
    type,
    field,
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
    maxLength = 0,
    setParentInput,
    inputClasses,
    setParentState,
    textAllowContinue,
    handleKeyDown = ()=>{},
  } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const [valueLocal, setValueLocal] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [state, setState] = React.useState(false);
  const [textareaCount, setCount] = React.useState(maxLength);

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
    // emitEvent(e.target.value);
    onChange(e.target.value);
  };

  const onTextAreaValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    maxLength && setCount(maxLength - e.target.value.length);
    setValueLocal(e.target.value);
    // emitEvent(e.target.value);
    onChange(e.target.value);
  };


  React.useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  React.useEffect(() => {
    if (autoFocus) {
      textareaRef.current?.focus();
    }
  }, [autoFocus]);

  React.useEffect(() => {
    if (value) {
      setValueLocal(value);
    }
  }, [value]);

  // React.useEffect(() => {
  //   if (type == "password" && valueLocal.length < 7) {
  //   }
  // }, []);

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`flex items-center relative ${type != 'full' && 'py-[10px]'}`}
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
          {field ? (
            <>
              {maxLength && (
                <div className="absolute top-1 right-1 text-[10px] leading-[15px] w-[19px] h-[15px]">
                  {textareaCount?.toString()}
                </div>
              )}
              <textarea
                ref={textareaRef}
                placeholder={placeholder}
                value={value}
                className={
                  `text-gray bg-transparent border-[#DCDCDC] border rounded outline-none text-sm py-2 pl-1 w-full min-h-16 resize-none text-wrap overflow-y-auto ${error && 'border-[#ee5253]'}`
                }
                style={{ flex: 1 }}
                onChange={onTextAreaValueChange}
                onFocus={onFocusInput}
                onBlur={onBlurInput}
                maxLength={
                  maxLength && !textAllowContinue ? maxLength : undefined
                }
                onKeyDown={handleKeyDown}
              />
            </>
          ) : (
            <input
              type={type === "password" && !showPassword ? "password" : "text"}
              ref={inputRef}
              value={value}
              placeholder={placeholder}
              className={
                type != "full"
                  ? `text-gray bg-transparent border-none outline-none text-sm ${inputClasses}`
                  : `text-gray bg-transparent border-[#DCDCDC] border rounded outline-none text-sm py-2 px-1 w-full ${inputClasses} ${
                      error && "border-[#ee5253]"
                    }`
              }
              style={{ flex: 1 }}
              onChange={onValueChange}
              onFocus={onFocusInput}
              onBlur={onBlurInput}
            />
          )}

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
        {type != "full" ? (
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
        ) : (
          <></>
        )}

        {error && state && !textAllowContinue ? (
          <p
            className="absolute h-[1px] w-full left-0 bottom-0 text-[10px] leading-[15px] text-[#ee5253]"
            style={{ transition: "all .35s ease" }}
          >
            {errorMessage}
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
