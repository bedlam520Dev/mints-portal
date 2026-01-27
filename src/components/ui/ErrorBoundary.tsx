'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Component, type ReactNode } from 'react';

import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

type ErrorBoundaryProps = {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
	resetOnPropsChange?: unknown[];
};

type ErrorBoundaryState = {
	hasError: boolean;
	error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo);
		this.props.onError?.(error, errorInfo);
	}

	componentDidUpdate(prevProps: ErrorBoundaryProps) {
		if (
			this.state.hasError &&
			this.props.resetOnPropsChange &&
			prevProps.resetOnPropsChange !== this.props.resetOnPropsChange
		) {
			this.reset();
		}
	}

	reset = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className='flex min-h-[400px] items-center justify-center p-4'>
					<Card className='w-full max-w-md border-destructive/50'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-destructive'>
								<AlertCircle className='h-5 w-5' />
								Something went wrong
							</CardTitle>
							<CardDescription>
								An unexpected error occurred. Please try again.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							{process.env.NODE_ENV === 'development' && this.state.error && (
								<pre className='overflow-auto rounded-md bg-muted p-3 text-xs'>
									{this.state.error.message}
								</pre>
							)}
							<Button
								onClick={this.reset}
								className='w-full'
								variant='outline'
							>
								<RefreshCw className='mr-2 h-4 w-4' />
								Try Again
							</Button>
						</CardContent>
					</Card>
				</div>
			);
		}

		return this.props.children;
	}
}

// Hook version for functional components
export function useErrorHandler() {
	return (error: Error) => {
		throw error;
	};
}
