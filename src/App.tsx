import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRootRoute, createRoute, redirect } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailurePage from './pages/PaymentFailurePage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

const queryClient = new QueryClient();

const rootRoute = createRootRoute();

const welcomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: WelcomePage,
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: Layout,
  beforeLoad: () => {
    const ageVerified = sessionStorage.getItem('ageVerified');
    if (!ageVerified) {
      throw redirect({ to: '/' });
    }
  },
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/home',
  component: HomePage,
});

const shopRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/tienda',
  component: ShopPage,
});

const productDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/producto/$productId',
  component: ProductDetailPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/checkout',
  component: CheckoutPage,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/payment-success',
  component: PaymentSuccessPage,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/payment-failure',
  component: PaymentFailurePage,
});

const orderTrackingRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/seguimiento',
  component: OrderTrackingPage,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/politica-privacidad',
  component: PrivacyPolicyPage,
});

const termsOfServiceRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/terminos-servicio',
  component: TermsOfServicePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboardPage,
});

const routeTree = rootRoute.addChildren([
  welcomeRoute,
  adminRoute,
  layoutRoute.addChildren([
    homeRoute,
    shopRoute,
    productDetailRoute,
    checkoutRoute,
    paymentSuccessRoute,
    paymentFailureRoute,
    orderTrackingRoute,
    privacyPolicyRoute,
    termsOfServiceRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
