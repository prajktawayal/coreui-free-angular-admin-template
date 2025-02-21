import { AbstractControl, ValidationErrors } from '@angular/forms';

// Custom email domain validator
export function emailDomainValidator(allowedDomains: string[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (email && allowedDomains.length > 0) {
      const domain = email.substring(email.lastIndexOf('.') + 1);
      if (!allowedDomains.includes(domain)) {
        return { invalidDomain: true };
      }
    }
    return null;
  };
}
