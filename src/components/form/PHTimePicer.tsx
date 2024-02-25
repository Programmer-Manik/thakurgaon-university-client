import { Form, TimePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type PHTimePicker = {
  name: string;
  label?: string;
};

const PHTimePicker = ({ name, label }: PHTimePicker) => {
  const {control} = useFormContext()
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Form.Item label={label}>
              <TimePicker
                {...field}
                style={{ width: "100%" }}
                size="large"
                format="HH:mm"
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          </>
        )}
      ></Controller>
    </div>
  );
};

export default PHTimePicker;
