type ToastProps = {
  message: string
  variant?: 'success' | 'error'
}

/** 全局表单反馈提示（fixed 定位，样式见 App.css） */
export function Toast({ message, variant = 'success' }: ToastProps) {
  return <div className={`toast${variant === 'error' ? ' toast-error' : ''}`} role="status">{message}</div>
}
