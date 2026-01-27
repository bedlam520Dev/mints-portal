'use client';

import {
	getOrganizationStructuredData,
	getWebsiteStructuredData,
} from '@/lib/structuredData';

// Security note: dangerouslySetInnerHTML is safe here as we're using statically-generated
// structured data from our own code, not user input. JSON.stringify ensures proper escaping.
export function StructuredData() {
	const websiteData = getWebsiteStructuredData();
	const organizationData = getOrganizationStructuredData();

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(websiteData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(organizationData),
				}}
			/>
		</>
	);
}
