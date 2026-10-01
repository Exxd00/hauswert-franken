import { authenticated } from '@/lib/quotes/auth';
import { OwnerLogin } from '@/components/admin/OwnerLogin';
import { OwnerDashboard } from '@/components/admin/OwnerDashboard';
import './admin.css';
export const dynamic = 'force-dynamic';
export default async function AdminPage() {
  return (await authenticated()) ? <OwnerDashboard /> : <OwnerLogin />;
}
