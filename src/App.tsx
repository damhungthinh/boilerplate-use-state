import React, { FormEvent, FunctionComponent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type InputProps = {
  label?: string
  type: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

const Input: React.FunctionComponent<InputProps> = (props) => {
  const {
    type,
    label,
    placeholder,
    // default props
    value = '',
    onChange,
  } = props
  const htmlId = uuidv4()

  // map props to state
  const [textValue, setTextValue] = useState(value)

  console.log(label, 'render')
  return (
    <>
      {/** React fragment */}
      {label && (
        <label htmlFor={htmlId} className='form-label text-capitalize'>
          {label}
        </label>
      )}
      <input
        className='form-control'
        type={type}
        id={htmlId}
        placeholder={placeholder}
        value={textValue}
        onChange={(e) => {
          setTextValue(e.target.value)
        }}
        onBlur={() => {
          if (onChange) {
            onChange(textValue || value)
          }
        }}
      ></input>
    </>
  )
}

type ButtonProps = {
  onClick: () => void
}
class Button extends React.Component<ButtonProps, { disabled: boolean }> {
  constructor(props: ButtonProps) {
    super(props)

    this.state = {
      disabled: false,
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick() {
    const { onClick } = this.props
    this.setState({ disabled: true })

    setTimeout(() => {
      this.setState({ disabled: false })
    }, 1000)

    if (onClick) {
      onClick()
    }
  }

  render(): React.ReactNode {
    const { children, ...rest } = this.props
    const { disabled } = this.state
    return (
      <button
        className='btn btn-primary'
        type='button'
        disabled={disabled}
        {...rest}
        onClick={this.handleButtonClick}
      >
        {disabled && <span className='fa fa-spinner fa-spin' />}
        &nbsp;{children}
      </button>
    )
  }
}

const ListItem: FunctionComponent = (props) => {
  const { children } = props
  return <li className='list-group-item'>{children}</li>
}

function App() {
  const [form, updateFormValue] = useState({
    username: 'admin',
    password: 'admin',
    confirmPassword: 'admin',
  })

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(form)
  }

  const handleButtonClick = () => {
    console.log(form)
  }

  const handleFormReset = () => {
    updateFormValue({
      username: '',
      password: '',
      confirmPassword: '',
    })
  }

  const listItems = [
    'An item',
    'A second item',
    'A third item',
    'A fourth item',
    'And a fifth one',
    'An item',
  ]

  const data = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' },
    { id: 4, name: 'd' },
    { id: 5, name: 'e' },
  ]

  return (
    <div className='container'>
      <form onSubmit={handleFormSubmit}>
        <div className='mb-3'>
          <Input
            type='text'
            label='username'
            value={form.username}
            onChange={(username) => {
              // Cách 1:
              updateFormValue({ ...form, username })

              // Cách 2:
              // updateFormValue({ ...form, username: username })

              // Cách 3: không dùng es6
              // let nextForm = {
              //   username: username,
              //   password: form.password,
              //   confirmPassword: form.confirmPassword
              // }
              // updateFormValue(nextForm)
            }}
          />
        </div>
        <div className='mb-3'>
          <Input
            type='password'
            label='password'
            value={form.password}
            onChange={(password) => updateFormValue({ ...form, password })}
          />
        </div>
        <div className='mb-3'>
          <Input
            type='password'
            placeholder='Confirm password'
            value={form.confirmPassword}
            onChange={(confirmPassword) =>
              updateFormValue({ ...form, confirmPassword })
            }
          />
        </div>
        <Button onClick={handleButtonClick}>Submit</Button>
        <button
          type='reset'
          className='btn btn-default'
          onClick={handleFormReset}
        >
          Reset
        </button>
      </form>

      <ul className='list-group'>
        {listItems.map((value, index) => (
          <ListItem key={index}>{value}</ListItem>
        ))}

        {data.map((value) => (
          <ListItem key={value.id}>{value.name}</ListItem>
        ))}
      </ul>
    </div>
  )
}

export default App
