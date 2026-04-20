import { createStore, Store } from "./store";
import { Signal } from "./reactive";
import { derive } from "./derived";

export interface FormConfig<T extends object> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export interface Form<T extends object> {
  values: Store<T>;
  errors: Store<Partial<Record<keyof T, string>>>;
  touched: Store<Partial<Record<keyof T, boolean>>>;
  isSubmitting: Signal<boolean>;
  isValid: () => boolean;
  handleChange: (e: Event) => void;
  handleBlur: (e: Event) => void;
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (e: Event) => void;
  reset: () => void;
}

export function createForm<T extends object>(config: FormConfig<T>): Form<T> {
  const values = createStore<T>({ ...config.initialValues });
  const errors = createStore<Partial<Record<keyof T, string>>>({});
  const touched = createStore<Partial<Record<keyof T, boolean>>>({});
  const isSubmitting = new Signal(false);

  // We can use a trick to evaluate isValid. Since errors is a store,
  // we do not directly iterate over its keys without reading them. 
  // However, derived/validate will likely be evaluated differently.
  // For simplicity, we just check if any key in `errors` has a truthy value.
  // This might not be fully reactive dynamically if new keys are added,
  // but it's okay for basic form handling.
  
  const validateForm = (currentValues: T) => {
    if (config.validate) {
      const newErrors = config.validate(currentValues);
      errors.setState(newErrors);
    }
  };

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (target && target.name) {
      const name = target.name as keyof T;
      let value: any = target.value;
      if (target.type === "checkbox") {
        value = (target as HTMLInputElement).checked;
      } else if (target.type === "number") {
        value = Number(target.value);
      }
      
      (values as any)[name] = value;
      if ((touched as any)[name]) {
        validateForm(values as unknown as T);
      }
    }
  };

  const handleBlur = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (target && target.name) {
      const name = target.name as keyof T;
      (touched as any)[name] = true;
      validateForm(values as unknown as T);
    }
  };

  const handleSubmit = (onSubmit: (values: T) => void | Promise<void>) => async (e: Event) => {
    e.preventDefault();
    validateForm(values as unknown as T);
    
    // Mark all as touched
    const allTouched: Partial<Record<keyof T, boolean>> = {};
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key) && key !== 'setState') {
        allTouched[key as keyof T] = true;
      }
    }
    touched.setState(allTouched);

    const hasErrors = Object.values(errors).some(err => !!err);
    if (hasErrors) return;

    isSubmitting.value = true;
    try {
      await onSubmit(values as unknown as T);
    } finally {
      isSubmitting.value = false;
    }
  };

  const reset = () => {
    values.setState(config.initialValues);
    errors.setState({});
    touched.setState({});
    isSubmitting.value = false;
  };

  const isValid = () => {
    return !Object.values(errors).some(err => !!err);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  };
}
