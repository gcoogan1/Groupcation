import React, { createRef, useState } from "react";
import { View, TextInput, TouchableOpacity, FlatList } from "react-native";

import Icon from "../../Icon/Icon";
import Search from "../../../../assets/icons/Search.svg";
import Close from "../../../../assets/icons/Close.svg";
import { theme } from "../../../styles/theme";
import { inputSearchStyles } from "./styles/InputSearch.styles";
import SearchList from "../../SearchList/SearchList";
import { Text } from "react-native";

/**
 * This component renders a search input based on selections (suggested search list).
 * @prop {array} data required -> array of objects containing the search list of suggestions. 
 * ex.
 * const mockSuggestions = [
   { itemLabel: 'Paris' },
   { itemLabel: 'Hong kong'}
  ];
 * @prop {function} onSearch required -> event to be fired when search is pressed
 * @prop {string} sectionTitle required -> title of search list
 * @prop {string} emptyText required -> text to be shown when the search list is not displayed
 * @prop {boolean} isDisabled optional -> disabled state of the input
 * @prop {object} styles optional -> optional styles
 * @returns {ReactNode} Renders a select input field.
 * 
 * @example 
 * <InputSearch
    data={mockSuggestions}
    onSearch={() => console.log("search")}
    sectionTitle={'section title'} 
    emptyText={"Empty State Text"}
   />
 */
const InputSearch = ({
  data,
  onSearch,
  sectionTitle,
  emptyText,
  styles,
  isDisabled,
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selections, setSelections] = useState([]);
  const [initiateSearch, setIntiateSearch] = useState(false);
  const inputRef = createRef();

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query.trim());
    }
    setQuery("");
    setIntiateSearch(true);
  };

  const handleInputChange = (text) => {
    setIntiateSearch(false);
    setQuery(text);
    // Filter selections by text
    const filteredSelections = data.filter((item) =>
      item.itemLabel.toLowerCase().includes(text.toLowerCase())
    );
    setSelections(filteredSelections);
  };

  const handleSelectSelection = (item) => {
    // Navigate to trip when pressedxa
    setQuery(item.itemLabel);
    setIntiateSearch(false);
    setSelections([]);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    inputRef.current.clear();
    setSelections([]);
  };

  return (
    <View style={[inputSearchStyles.container, { ...styles }]}>
      <View
        style={[
          inputSearchStyles.inputContainer,
          isFocused && inputSearchStyles.inputContainerFocused,
          isDisabled && inputSearchStyles.inputContainerDisbled,
        ]}
      >
        <TouchableOpacity onPress={handleSearch}>
          <Icon>
            <Search
              color={
                !isDisabled
                  ? theme.color.surface.onBasePrimary
                  : theme.color.disabled.base
              }
            />
          </Icon>
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          editable={isDisabled}
          style={[
            inputSearchStyles.input,
            isDisabled && inputSearchStyles.inputDisabled,
          ]}
          placeholder="Search..."
          value={query}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleInputChange}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleClear}>
          <Icon>
            <Close color={theme.color.disabled.onBase} />
          </Icon>
        </TouchableOpacity>
      </View>
      {!!initiateSearch && (
        <View style={inputSearchStyles.listContainer}>
          {selections.length > 0 ? (
            <SearchList
              itemList={selections}
              title={sectionTitle}
              onSelect={handleSelectSelection}
              listStyles={inputSearchStyles.selectionsList}
            />
          ) : (
            <View style={inputSearchStyles.emptyTextContainer}>
              <Text style={inputSearchStyles.emptyText}>{emptyText}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default InputSearch;
