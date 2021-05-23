import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";

export default class BottomSheet extends React.Component {
  render() {
    const { compRef, h, children, onClose, onDragClose } = this.props;

    let sheetProps = {
      animationType: "fade",
      customStyles: {
        wrapper: {},
        container: {
          borderRadius: 4,
          borderWidth: 1,
        }
      }
    };

    if (onDragClose) {
      sheetProps = { ...sheetProps, closeOnDragDown: true };
    }

    if (compRef) {
      sheetProps = { ...sheetProps, ref: compRef };
    }

    if (h) {
      sheetProps = { ...sheetProps, height: h };
    }

    if (onClose) {
      sheetProps = { ...sheetProps, onClose };
    }

    return <RBSheet {...sheetProps}>{children}</RBSheet>;
  }
}
