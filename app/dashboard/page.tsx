import { redirect } from 'next/navigation';

/**
 * Legacy /dashboard route. The logged-in home is /lists (labeled Dashboard).
 */
export default function DashboardRedirect() {
  redirect('/lists');
}
