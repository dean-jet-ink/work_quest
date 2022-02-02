import { memo, useState } from "react";
import { FormLabel } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment, { Moment } from "moment";
import "react-dates/lib/css/_datepicker.css";

import { PrimaryInputText } from "../../molcules/input/PrimaryInputText";
import { PrimaryModal } from "../../molcules/popUp/PrimaryModal";
import { Box } from "@chakra-ui/layout";
import { SubmitOrCancel } from "../../molcules/button/SubmitOrCancel";
import { WorkUpdateProps } from "../../../hooks/useWorks";
import "../../../assets/css/react-dates.css";
import { OptionalObjectSchema } from "yup/lib/object";
import { Work } from "../../../types/work";

type Props = {
  work: Work;
  onSubmit: (props: WorkUpdateProps) => void;
  validationSchema: OptionalObjectSchema<any>;
  onClose: () => void;
  isOpen: boolean;
};

export const EditWorkModal = memo((props: Props) => {
  const { work, onSubmit, validationSchema, onClose, isOpen } = props;
  const [date, setDate] = useState<Moment>();
  const [focused, setFocused] = useState(false);

  return (
    <PrimaryModal onClose={onClose} isOpen={isOpen} isCentered={false}>
      <Box py={{ base: 10 }} px={{ base: 10 }}>
        <Formik
          initialValues={{
            workName: work.workName,
            deadline: work.deadline,
          }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              onSubmit({ values, actions, workId: work.id });
              onClose();
            }, 500);
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, handleSubmit, setFieldValue }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                setFieldValue(
                  "deadline",
                  date ? moment.utc(date).format("YYYY-MM-DD") : null
                );
              }}
            >
              <FormLabel textAlign="center" mb={6}>
                ワーク名
                <PrimaryInputText name="workName" />
              </FormLabel>
              <FormLabel textAlign="center" mb={6}>
                締切 （任意）
                <SingleDatePicker
                  id="calendar"
                  date={date!}
                  placeholder="カレンダー"
                  onDateChange={(date) => setDate(date!)}
                  focused={focused}
                  onFocusChange={({ focused }) => setFocused(focused)}
                  displayFormat="YYYY/MM/DD"
                  numberOfMonths={1}
                  block={true}
                />
              </FormLabel>
              <SubmitOrCancel
                onClose={onClose}
                isLoading={isSubmitting}
                text="編集"
              />
            </Form>
          )}
        </Formik>
      </Box>
    </PrimaryModal>
  );
});
