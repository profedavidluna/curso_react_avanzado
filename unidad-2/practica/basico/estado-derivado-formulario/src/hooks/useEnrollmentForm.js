import { useMemo, useState } from 'react';

const initialForm = {
  name: '',
  role: 'frontend',
  hoursPerWeek: 8,
  acceptsPolicy: false,
};

export function useEnrollmentForm() {
  const [form, setForm] = useState(initialForm);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const summary = useMemo(() => {
    const weeklyLoad = form.hoursPerWeek >= 10 ? 'alta' : 'moderada';
    const isReady = form.name.trim().length >= 3 && form.acceptsPolicy;

    return {
      weeklyLoad,
      isReady,
      profile: `${form.name || 'Participante'} · ${form.role}`,
    };
  }, [form]);

  return {
    form,
    summary,
    updateField,
  };
}
