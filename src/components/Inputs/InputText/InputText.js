import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { createRef, useState } from "react";

import { theme } from "../../../styles/theme";
import { inputTextStyles } from "./styles/InputText.styles";
import { capitilaizeFirstLetter } from "../../../util/helperFunctions/helperFunctions";
import Icon from "../../Icon/Icon";
import Close from "../../../../assets/icons/Close.svg";
import Error from "../../../../assets/icons/Error.svg";

/**
 * This component renders a text input with an optional placeholder icon.
 * clear button, helper text and counter.
 * @prop {string} inputName required -> name of input
 * @prop {string} inputLabel required -> label to be displayed
 * @prop {function} onUpdateValue required -> event to be fired to update input value when changed
 * @prop {string} keyboardType optional -> type of keyboard
 * @prop {string} placeholder optional -> placeholder text to be displayed
 * @prop {component} placeholderIcon optional -> icon to be displayed next to placeholder text, 
 * remember to include disabled color. (see below)
 * Ex. <Placeholder color={!isDisabled ? theme.color.surface.onBasePrimary : theme.color.disabled.onBase} />
 * @prop {string} helperText optional -> helper text to be displayed below the input
 * @prop {boolean} showCount optional -> shows current input charcter count above the input 
 * @prop {boolean} showClear optional -> if true, displays a clear buttton with the option 
 * to clear the input field
 * @prop {boolean} isDisabled optional -> disabled state of the input
 * @prop {boolean} isValid optional -> error state of the input
 * @prop {string} errorMessage optional -> error message of input
 * @prop {function} clearInput optional -> event to be fire when clear button is pressed
 * @returns {ReactNode} Renders a input text field.
 * 
 * @example 
 * <InputText
    placeholder={"placeholder text"}
    inputLabel={"input label"}
    inputName="placeholder"
    onUpdateValue={(val) => updateInputValueHandler(val)}
    showCount
    showClear
    placeholderIcon={
      <Placeholder
        color={
          !disabledState
            ? theme.color.surface.onBasePrimary
            : theme.color.disabled.onBase
        }
      />
    }
    isDisabled={disabledState}
    helperText={"helper text"}
  />
 */
const InputText = ({
  inputName,
  inputLabel,
  keyboardType,
  placeholder,
  placeholderIcon,
  helperText,
  showCount,
  showClear,
  isDisabled,
  onUpdateValue,
  isValid,
  errorMessage,
  clearInput
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [count, setCount] = useState(0);
  const { control } = useForm();
  const inputRef = createRef();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleOnChange = (char) => {
    if (!!showCount) {
      const countLength = count.length;
      const characterLength = char.length;
      if (countLength !== characterLength) {
        setCount(characterLength);
      }
    }
    onUpdateValue(char)
  };

  const handleClearInput = () => {
    inputRef.current.clear();
    setCount(0);
    if (clearInput) {
      clearInput()
    }
  };


  return (
    <View style={inputTextStyles.container}>
      <View style={inputTextStyles.labelContainer}>
        <Text
          style={[
            inputTextStyles.label,
            isDisabled && inputTextStyles.labelDisabled,
            !isValid && inputTextStyles.labelError,
          ]}
        >
          {inputLabel}
        </Text>
        {!!showCount && <Text style={inputTextStyles.count}>{count}/999</Text>}
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={[
              inputTextStyles.inputContainer,
              isFocused && inputTextStyles.inputContainerFocused,
              !isValid && inputTextStyles.inputContainerError,
              isDisabled && inputTextStyles.inputContainerDisabled,
            ]}
          >
            <Icon>{placeholderIcon}</Icon>
            <TextInput
              ref={inputRef}
              style={[
                inputTextStyles.input,
                isDisabled && inputTextStyles.inputDisabled,
              ]}
              placeholder={capitilaizeFirstLetter(placeholder)}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChangeText={(e) => {
                handleOnChange(e);
              }}
              // value={value}
              keyboardType={keyboardType}
              editable={!isDisabled}
              maxLength={50}
            />
            {!!showClear && isValid && !isDisabled && (
              <TouchableOpacity onPress={handleClearInput}>
                <Icon>
                  <Close color={theme.color.surface.onBaseSecondary} />
                </Icon>
              </TouchableOpacity>
            )}
            {!isValid && (
              <Icon>
                <Error color={theme.color.error.base} />
              </Icon>
            )}
          </View>
        )}
        name={inputName}
      />
      {!!helperText && (
        <Text
          style={[
            inputTextStyles.helperText,
            isDisabled && inputTextStyles.helperTextDisabled,
          ]}
        >
          {helperText}
        </Text>
      )}
      {!isValid && (
        <Text style={inputTextStyles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default InputText;
