import React, {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useLinkQueryToScreenFocus} from './useLinkQueryToScreenFocus';

const queryClient = new QueryClient();

const QueryProvider: React.FC<{children: ReactNode}> = ({children}) => {
  useLinkQueryToScreenFocus();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
