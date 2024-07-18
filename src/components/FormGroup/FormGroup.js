import { ScrollView, View } from "react-native";

import PageHeader from "../PageHeader/PageHeader";
import ActionButtons from "../ActionButtons/ActionButtons";
import { formGroupStyles } from "./styles/FormGroup.styles";

/**
 * This component renders a form group with spacing options.
 * @prop {component} children required -> components to be displayed inside form
 * @prop {string} density required -> spacing options for form (compact, default, spacious)
 * @prop {string} formHeader optional -> header of form
 * @prop {string} formSubHeader optional -> sub-header of form
 * @prop {object} footerButtons required -> object containing footer buttons (see action button for details)
 * @prop {string} footerLayout required -> layout of footer buttons (vertical or horizontal)
 * @returns {ReactElement} Renders a form group.
 *
 * @example
 * <FormGroup
    formHeader={"Page header"}
    formSubHeader={"Page sub-header"}
    footerButtons={actionButtons}
    footerLayout={"vertical"}
    density={'compact'}
   >
     <Text>Slot</Text>
     <Text>Slot</Text>
     <Text>Slot</Text>
   </FormGroup>
 */
const FormGroup = ({
  children,
  density,
  formHeader,
  formSubHeader,
  footerButtons,
  footerLayout,
}) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {(formHeader || formSubHeader) && <PageHeader header={formHeader} subHeader={formSubHeader} />}
      <View
        style={[{ flex: 1 }, density ? formGroupStyles[density] : formGroupStyles.default]}
      >
        {children}
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end'}}>
        <ActionButtons buttonsGroup={footerButtons} layoutStyle={footerLayout} />
      </View>
    </ScrollView>
  );
};

export default FormGroup;
