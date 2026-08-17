'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const loginSchema = z.object({
  email: z.string().min(1, 'Informe o e-mail.').email('E-mail inválido.'),
  password: z.string().min(1, 'Informe a senha.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Formulário de login — Fase 4. A validação client-side (Zod + React
 * Hook Form) já está pronta e é reutilizável, mas a submissão real
 * (chamada ao endpoint de autenticação) só existe a partir da fase de
 * Autenticação, quando o backend expuser `/auth/login`.
 */
export default function LoginPage() {
  const [notice, setNotice] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  function onSubmit(): void {
    setNotice('Autenticação ainda não implementada — chega na próxima fase.');
  }

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-surface-foreground">Entrar</h1>
      <p className="mt-1 text-sm text-muted-foreground">Acesse sua conta BarberLess.</p>

      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            E-mail
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email ? (
            <p id="email-error" className="text-sm text-destructive">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Senha
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password')}
          />
          {errors.password ? (
            <p id="password-error" className="text-sm text-destructive">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          Entrar
        </Button>

        {notice ? (
          <p role="status" className="text-sm text-muted-foreground">
            {notice}
          </p>
        ) : null}
      </form>

      <p className="mt-6 text-sm text-muted-foreground">
        Não tem conta?{' '}
        <Link href="/cadastro" className="font-medium text-primary hover:underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
