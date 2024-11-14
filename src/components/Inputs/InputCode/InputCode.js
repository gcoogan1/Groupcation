import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { createRef, useState } from "react";

import { inputCodeStyles } from "./styles/InputCode.styles";
import { capitilaizeFirstLetter } from "../../../util/helperFunctions/helperFunctions";

/**
 * This component renders a code input that MUST be a 4 digit number.
 * @prop {string} inputName required -> name of input
 * @prop {string} inputLabel required -> label to be displayed
 * @prop {function} onUpdateValue required -> event to be fired to update input value when changed
 * @prop {boolean} isDisabled optional -> disabled state of the input
 * @prop {boolean} isValid optional -> error state of the input
 * @prop {string} errorMessage optional -> error message of input
 * @returns {ReactNode} Renders a input code field.
 * 
 * @example 
 * <InputCode
    inputLabel={"input label"}
    inputName={"input name"}
    onUpdateValue={(val) => updateInputValueHandler(val)}
    isDisabled={disabledState}
  />
 */
const InputCode = ({ inputName, inputLabel, isDisabled, isValid, onUpdateValue }) => {
  const [isFocused, setIsFocused] = useState(false);
  // const [count, setCount] = useState(0);
  const { control } = useForm();
  const inputRef = createRef();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleOnChange = (char) => {
    onUpdateValue(char.replace(/[^0-9]/,""))
  };

  return (
    <View style={inputCodeStyles.container}>
      <View style={inputCodeStyles.labelContainer}>
        <Text
          style={[
            inputCodeStyles.label,
            isDisabled && inputCodeStyles.labelDisabled,
            !isValid && inputCodeStyles.labelError,
          ]}
        >
          {inputLabel}
        </Text>
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={[
              inputCodeStyles.inputContainer,
              isFocused && inputCodeStyles.inputContainerFocused,
              !isValid && inputCodeStyles.inputContainerError,
              isDisabled && inputCodeStyles.inputContainerDisabled,
            ]}
          >
            <TextInput
              maxLength={4}
              minLength={4}
              ref={inputRef}
              keyboardType="numeric"
              style={[
                inputCodeStyles.input,
                isDisabled && inputCodeStyles.inputDisabled,
              ]}
              placeholder={"0000"}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChangeText={(e) => {
                handleOnChange(e), onChange;
              }}
              value={value}
              editable={!isDisabled}
            />
          </View>
        )}
        name={inputName}
      />
      {!isValid && (
        <Text style={inputCodeStyles.errorText}>This is required.</Text>
      )}
    </View>
  );
};

export default InputCode;
