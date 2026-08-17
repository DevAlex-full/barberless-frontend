export interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: 'BarberLess',
  description: 'Plataforma digital da BarberLess.',
};

export const publicNav: NavItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Entrar', href: '/login' },
  { label: 'Cadastrar', href: '/cadastro' },
];

export const clientNav: NavItem[] = [{ label: 'Visão geral', href: '/cliente' }];

export const adminNav: NavItem[] = [{ label: 'Dashboard', href: '/painel' }];
