import { Text, View } from "react-native";

import ActionButtons from "../ActionButtons/ActionButtons";
import { dialogStyles } from "./styles/Dialog.styles";

/**
 * This component renders a dialog with optional title, subTitle and child component.
 * @prop {object} footerButtons required -> object containing vertical footer 
 * buttons (should have top and bottom buttons)
 * @prop {string} buttonType optional -> title of dialog
 * @prop {string} buttonType optional -> subTitle of dialog
 * @prop {component} children optional -> component to be rendered below the title
 * @returns {ReactElement} Renders a Dialog.
 *
 * @example
 * <Dialog title={"Dialog Title"} subTitle={"Dialog sub-title"} footerButtons={actionButtons}> 
    <View>
      <Text style={{ textAlign: 'center' }}>This is a slot!</Text>
    </View>
  </Dialog>
 */
const Dialog = ({ footerButtons, title, subTitle, children }) => {
  return (
    <View style={dialogStyles.container}>
      <View style={dialogStyles.contents}>
        <View style={dialogStyles.textContainer}>
          <View style={dialogStyles.titleContainer}>
            <Text style={dialogStyles.title}>{title}</Text>
            <Text style={dialogStyles.subTitle}>{subTitle}</Text>
          </View>
        </View>
        <View>{children}</View>
        <ActionButtons buttonsGroup={footerButtons} layoutStyle={"vertical"} />
      </View>
    </View>
  );
};

export default Dialog;
