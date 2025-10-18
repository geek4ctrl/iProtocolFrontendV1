import { toast, ToastOptions, TypeOptions } from 'react-toastify';

/**
 * Standardized toast notification configuration
 */
const defaultToastConfig: ToastOptions = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored"
};

/**
 * Standardized toast notification utilities
 */
export const showToast = {
    /**
     * Success notification
     */
    success: (message: string, options?: ToastOptions) => {
        toast.success(message, { ...defaultToastConfig, ...options });
    },

    /**
     * Error notification
     */
    error: (message: string, options?: ToastOptions) => {
        toast.error(message, { ...defaultToastConfig, ...options });
    },

    /**
     * Info notification
     */
    info: (message: string, options?: ToastOptions) => {
        toast.info(message, { ...defaultToastConfig, ...options });
    },

    /**
     * Warning notification
     */
    warning: (message: string, options?: ToastOptions) => {
        toast.warning(message, { ...defaultToastConfig, ...options });
    },

    /**
     * Loading notification (returns toast ID for updating)
     */
    loading: (message: string, options?: ToastOptions) => {
        return toast.loading(message, { ...defaultToastConfig, ...options });
    },

    /**
     * Update an existing toast
     */
    update: (toastId: string | number, options: ToastOptions & { type?: TypeOptions; render?: string }) => {
        toast.update(toastId, { ...defaultToastConfig, ...options });
    },

    /**
     * Dismiss a specific toast or all toasts
     */
    dismiss: (toastId?: string | number) => {
        toast.dismiss(toastId);
    }
};

/**
 * Common error message handler
 */
export const handleError = (error: any, context: string = 'Operation') => {
    console.error(`${context} error:`, error);

    let message = `${context} failed. Please try again.`;

    // Supabase error handling
    if (error?.code) {
        switch (error.code) {
            case '23505':
                message = 'This record already exists.';
                break;
            case '23503':
                message = 'This action cannot be completed due to related data.';
                break;
            case '42P01':
                message = 'Database table not found. Please contact support.';
                break;
            case '42501':
                message = 'Permission denied. Please check your access rights.';
                break;
            case 'PGRST116':
                message = 'No data found.';
                break;
            case '22P02':
                message = 'Invalid data format.';
                break;
            default:
                if (error.message) {
                    message = error.message;
                }
        }
    } else if (error?.message) {
        message = error.message;
    } else if (typeof error === 'string') {
        message = error;
    }

    showToast.error(message);
    return message;
};

/**
 * Success message handler
 */
export const handleSuccess = (message: string, autoClose: number = 4000) => {
    showToast.success(message, { autoClose });
};

/**
 * Network error handler
 */
export const handleNetworkError = () => {
    showToast.error('Network error. Please check your internet connection and try again.');
};

/**
 * Authentication error handler
 */
export const handleAuthError = (error: any) => {
    console.error('Auth error:', error);

    let message = 'Authentication failed. Please try again.';

    if (error?.message) {
        if (error.message.includes('Invalid login credentials')) {
            message = 'Invalid email or password. Please try again.';
        } else if (error.message.includes('Email not confirmed')) {
            message = 'Please verify your email address before signing in.';
        } else if (error.message.includes('User already registered')) {
            message = 'This email is already registered. Please sign in instead.';
        } else {
            message = error.message;
        }
    }

    showToast.error(message);
    return message;
};

/**
 * Validation error handler
 */
export const handleValidationError = (field: string, rule: string) => {
    const messages: Record<string, string> = {
        required: `${field} is required.`,
        email: `Please enter a valid email address.`,
        minLength: `${field} is too short.`,
        maxLength: `${field} is too long.`,
        pattern: `${field} format is invalid.`,
        match: `${field} do not match.`,
    };

    const message = messages[rule] || `${field} is invalid.`;
    showToast.warning(message);
    return message;
};

/**
 * File upload error handler
 */
export const handleFileUploadError = (error: any, fileType: string = 'file') => {
    console.error('File upload error:', error);

    let message = `Failed to upload ${fileType}. Please try again.`;

    if (error?.message) {
        if (error.message.includes('size')) {
            message = `${fileType} is too large. Maximum size is 5MB.`;
        } else if (error.message.includes('type') || error.message.includes('format')) {
            message = `Invalid ${fileType} format. Please use a supported file type.`;
        } else {
            message = error.message;
        }
    }

    showToast.error(message);
    return message;
};
