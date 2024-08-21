 import { View, Text } from "react-native";

import { topBarStyles } from "./styles/TopBar.styles";
import Button from "../Button/Button";
import InputSearch from "../Inputs/InputSearch/InputSearch";
import Add from "../../../assets/icons/Add.svg";
import { theme } from "../../styles/theme";

/**
 * This component renders a top bar that contains with a searchInput/title with an add button.
 * @prop {function} onButtonPress required -> event to be fire when add button is pressed
 * @prop {boolean} isSearch optional -> if true, displays search input instead of title
 * @prop {array} searchData optional (req if isSearch) -> array of objects containing the search list of suggestions. 
 * @prop {function} onSearch optional (req if isSearch) -> event to be fired when search is pressed
 * @prop {string} sectionTitle optional (req if isSearch) -> title of search list
 * @prop {string} emptyText optional (req if isSearch) -> text to be shown when the search list is not displayed
 * @prop {boolean} isDisabled optional -> disabled state of the search input
 * @prop {string} title optional (req if NOT isSearch) -> title of top bar
 * @returns {ReactNode} Renders a top bar.
 * 
 * @example 
 * <TopBar 
    isSearch
    onButtonPress={() => console.log("here")}
    searchData={mockSuggestions}
    onSearch={() => console.log("search")}
    sectionTitle={'section title'} 
    emptyText={"Empty State Text"}
   />
 */
const TopBar = ({
  isSearch,
  searchData,
  sectionTitle,
  onSearch,
  emptyText,
  isDisabled,
  title,
  onButtonPress,
}) => {
  return (
    <View style={topBarStyles.container}>
      <View>
        {!!isSearch ? (
          <InputSearch
            data={searchData}
            sectionTitle={sectionTitle}
            onSearch={onSearch}
            emptyText={emptyText}
            isDisabled={isDisabled}
            styles={{ marginHorizontal: 0, marginTop: 0 }}
          />
        ) : (
          <Text style={topBarStyles.title}>{title}</Text>
        )}
      </View>
      <View>
        <Button
          buttonSize={"sm"}
          onPress={onButtonPress}
          buttonType={"primary"}
          iconLeft={<Add color={theme.color.primary.onBase} />}
          styles={{ gap: 0, padding: theme.spacing.md, marginTop: 2 }}
        />
      </View>
    </View>
  );
};

export default TopBar;
