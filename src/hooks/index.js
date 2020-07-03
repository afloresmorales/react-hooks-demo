import { useState } from 'react'

export function useFieldState(initialState) {
  const [fields, setFields] = useState(initialState);
  return [
    fields,
    (event) => {
      setFields({
        ...fields,
        [event.target.name]: event.target.value
      })
    }
  ]
}
