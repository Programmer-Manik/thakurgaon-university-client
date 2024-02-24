import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?:boolean
  mode?:'multiple'| undefined
};

const PHSelect = ({ mode ,label, name, options, disabled }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
          mode={mode}
            style={{ width: '100%' }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
