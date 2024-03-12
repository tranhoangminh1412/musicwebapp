import * as React from "react";

import useDebounce from "@/hooks/useDebounce";

import IcEye from "@/assets/icons/IcEye";

import styles from "./InputTextfield.module.scss";

export interface IInpTextFieldProps {
	label?: string;
	value: string;
	onChange: Function;
	placeholder?: string;
	className?: string;
	debounce?: number;
	color?: string;
	children?: React.ReactElement;
	type?: string;
	count?: boolean;
	disabled?: boolean;
	required?: boolean;
	rows?: number;
	error?: boolean;
	errorMessage?: string;
	mode?: string;
	autoFocus?: boolean;
}

export default function InpTextField(props: IInpTextFieldProps) {
	const {
		label,
		value,
		onChange = () => {},
		placeholder,
		className = "",
		debounce = 0,
		color = "primary",
		children,
		type = "text",
		count = false,
		disabled = false,
		required = false,
		error = false,
		errorMessage,
		mode = "default",
		autoFocus = false,
		rows = 2,
	} = props;

	const inputRef = React.useRef<HTMLInputElement>(null);
	const textareaRef = React.useRef<HTMLTextAreaElement>(null);

	const [valueLocal, setValueLocal] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [focus, setFocus] = React.useState(false);
	const [state, setState] = React.useState(false);

	const onClickLabel = (e: React.MouseEvent<HTMLElement>) => {
		const target: any = e.target;
		if (!target.classList.contains("show-eye")) {
			type === "textarea"
				? textareaRef.current?.focus()
				: inputRef.current?.focus();
		}
	};

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
		if (!disabled) {
			setValueLocal(e.target.value);
			emitEvent(e.target.value);

			const target = textareaRef.current;
			if (type === "textarea" && target) {
				target.style.height = `${24 * rows}px`;
				target.style.height = target.scrollHeight + "px";
			}
		}
	};

	React.useEffect(() => {
		if (autoFocus) {
			type === "textarea"
				? textareaRef.current?.focus()
				: inputRef.current?.focus();
		}
	}, [autoFocus]);

	React.useEffect(() => {
		if (value) {
			setValueLocal(value);
		}
	}, [value]);

	return (
		<div
			className={`input-textfield w-max min-w-[300px] ${styles["input"]} ${className}`}
		>
			{label && (
				<label
					className="label text-light mb-2 inline-block flex items-end"
					onClick={onClickLabel}
				>
					{required && <span className="text-error">*</span>}
					<span className="mr-2" style={{ flex: 1 }}>
						{label}
					</span>
					{count && (
						<span className="ml-auto text-grey text-xs">
							{valueLocal.length}
						</span>
					)}
				</label>
			)}
			<div
				className={`input-textfield__box flex items-center py-4 relative ${
					mode === "border" &&
					`border ${
						focus
							? "border-" + color
							: error && state
							? "border-error"
							: "border-grey"
					} px-4 rounded-xl`
				} ${
					mode === "filled" &&
					`px-4 rounded-xl ${styles["bg-filled"]} ${
						focus
							? "shadow-" + color
							: error && state
							? "shadow-error"
							: "shadow-none"
					}`
				} ${disabled && "opacity-90 pointer-events-none"}  ${
					styles["hover-light"]
				}`}
				style={{ transition: "all .35s ease" }}
				onClick={onClickLabel}
			>
				{children &&
					React.cloneElement(children, {
						size: "16",
						color: "#757185",
						className: "mr-6",
					})}

				{type === "textarea" ? (
					<textarea
						ref={textareaRef}
						rows={rows}
						value={valueLocal}
						placeholder={placeholder}
						disabled={disabled}
						className="text-grey bg-transparent border-none outline-none resize-none text-sm"
						style={{ flex: 1 }}
						onChange={onValueChange}
						onFocus={onFocusInput}
						onBlur={onBlurInput}
					/>
				) : (
					<>
						<input
							type={type === "password" && !showPassword ? "password" : "text"}
							ref={inputRef}
							value={valueLocal}
							placeholder={placeholder}
							disabled={disabled}
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
				)}
				{mode === "default" && (
					<div
						className={`absolute h-[1px] w-full left-0 bottom-0 ${
							focus
								? "bg-" + color
								: error && state
								? "bg-error"
								: `bg-lighter-dark ${styles["border-light"]}`
						}`}
						style={{ transition: "all .35s ease" }}
					></div>
				)}
			</div>
			{error && state && (
				<div
					className={`text-xs text-error mt-1 pl-2 ${styles["show-error"]}`}
					style={{
						marginBottom: "-20px",
					}}
				>
					{errorMessage}
				</div>
			)}
		</div>
	);
}
