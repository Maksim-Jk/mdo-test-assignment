declare module 'vue-focus-lock' {
  import { DefineComponent } from 'vue'

  interface FocusLockProps {
    disabled?: boolean
    returnFocus?: boolean
    group?: string
    crossFrame?: boolean
    autoFocus?: boolean
    persistentFocus?: boolean
    allowTextSelection?: boolean
  }

  const FocusLock: DefineComponent<FocusLockProps>
  export default FocusLock
}
