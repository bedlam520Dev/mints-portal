'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

type Mode = 'page' | 'overlay';

type SectionProps = {
	children: ReactNode;
};

const Section = ({ children }: SectionProps) => (
	<section className='legal-section'>{children}</section>
);

type LegalContentProps = {
	mode?: Mode;
};

export const TermsContent = ({ mode = 'page' }: LegalContentProps) => (
	<article className='legal-article'>
		<header
			className={`text-center ${mode === 'page' ? 'mb-8' : 'mb-4'} mint-gradient-text`}
		>
			<h1 className='legal-h1'>Terms of Service</h1>
			<section className='legal-separator mint-border border'></section>
			<p className='legal-p'>Last updated: 26 January 2026</p>
			<section className='legal-separator mint-border border'></section>
		</header>

		<Section>
			<h2 className='legal-h2'>1. Overview</h2>
			<p className='legal-p'>
				These Terms of Service ({'"'}Terms{'"'}) govern your access to and use of the
				BEDLAM520nft website, smart contracts, mints, and any related interfaces
				(collectively, the {'"'}Service
				{'"'}). By connecting a wallet, minting, or otherwise interacting with the
				Service, you agree to these Terms.
			</p>
			<p className='legal-p'>
				If you do not agree, do not use the Service. You are responsible for ensuring
				that your use complies with all laws and regulations in your jurisdiction.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>2. Eligibility</h2>
			<p className='legal-p'>
				You represent and warrant that you are at least the age of majority in your
				jurisdiction, legally capable of entering into binding contracts, and not barred
				from using the Service under applicable law.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>3. Wallets and On-Chain Activity</h2>
			<p className='legal-p'>
				The Service interacts with self-custodial crypto wallets and public blockchain
				networks. You are solely responsible for:
			</p>
			<ul className='legal-ul'>
				<li>Securing your wallet, keys, seed phrases, and devices.</li>
				<li>
					Reviewing contract addresses, mint parameters, and transaction details before
					signing.
				</li>
				<li>
					All on-chain actions taken from your wallet, whether authorized by you or by
					anyone with access to your wallet.
				</li>
			</ul>
			<p className='legal-p'>
				Blockchain transactions are typically irreversible. Once a transaction is
				broadcast and confirmed, it cannot be canceled, reversed, or rewritten by us.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>4. No Financial, Investment, or Legal Advice</h2>
			<p className='legal-p'>
				Content, NFTs, or tokens associated with the Service are creative and
				experimental in nature. Nothing presented through the Service constitutes
				financial, investment, tax, legal, or other professional advice. You should not
				make decisions based solely on information provided by the Service and should
				consult independent advisors as needed.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>5. Risks and No Guarantee of Value</h2>
			<p className='legal-p'>
				You understand and accept the inherent risks of blockchain technology, including
				but not limited to:
			</p>
			<ul className='legal-ul'>
				<li>Permanent loss of access due to lost keys or seed phrases.</li>
				<li>Volatility and loss of value of tokens, NFTs, and digital assets.</li>
				<li>Network congestion, failed transactions, front-running, and MEV.</li>
				<li>
					Bugs, vulnerabilities, or unexpected behavior in smart contracts or
					infrastructure.
				</li>
				<li>Phishing, malware, and other security threats outside our control.</li>
			</ul>
			<p className='legal-p'>
				We do not guarantee that any NFT, token, or associated content will retain any
				value, utility, or liquidity. You participate entirely at your own risk.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>6. Purchases, Mints, and Fees</h2>
			<p className='legal-p'>
				When you mint or purchase, you authorize the applicable smart contract to
				initiate a transaction from your wallet. You are responsible for:
			</p>
			<ul className='legal-ul'>
				<li>All gas fees, network fees, and protocol fees.</li>
				<li>
					Confirming that you are interacting with the correct contract addresses.
				</li>
				<li>
					Ensuring that your wallet and network settings are correctly configured.
				</li>
			</ul>
			<p className='legal-p'>
				Unless explicitly stated otherwise, all mints and purchases are final and
				non-refundable.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>
				7. No Liability for Losses (With Limited Development Exception)
			</h2>
			<p className='legal-p'>
				To the maximum extent permitted by law, BEDLAM520nft and its developers,
				contributors, and affiliates are not liable for any indirect, incidental,
				consequential, special, exemplary, or punitive damages, or for any loss of
				profits, digital assets, data, or goodwill, arising out of or in connection with
				your use of the Service.
			</p>
			<p className='legal-p'>
				Without limiting the foregoing, we are not liable for losses caused by:
			</p>
			<ul className='legal-ul'>
				<li>Market movements or asset price volatility.</li>
				<li>Smart contract or blockchain failures or changes.</li>
				<li>Third-party wallets, bridges, or infrastructure providers.</li>
				<li>Phishing, social engineering, or user operational mistakes.</li>
			</ul>
			<p className='legal-p'>
				The only narrow exception is where a court of competent jurisdiction determines
				that:
			</p>
			<ul className='legal-ul'>
				<li>
					We publicly represented a specific development milestone or feature as fully
					completed and safe to use; and
				</li>
				<li>
					A loss you suffered was the direct and sole result of that representation
					being false due to our verified failure to complete the development work as
					described.
				</li>
			</ul>
			<p className='legal-p'>
				This exception does not apply to general market risk, user error, third-party
				dependencies, or risks inherent to blockchains or smart contracts. In all cases,
				our aggregate liability is capped at the amount of fees, if any, directly
				received by us from you in connection with the relevant transaction.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>8. Intellectual Property</h2>
			<p className='legal-p'>
				Unless otherwise stated, all site design, branding, logos, text, layout, and
				code are owned by BEDLAM520 Development or its licensors. Your purchase of an
				NFT does not grant ownership of underlying intellectual property, except for any
				rights explicitly described in the NFT project documentation.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>9. Prohibited Uses</h2>
			<p className='legal-p'>You agree not to use the Service to:</p>
			<ul className='legal-ul'>
				<li>Violate any law, regulation, or third-party rights.</li>
				<li>Launder money, finance terrorism, or engage in fraudulent activity.</li>
				<li>
					Interfere with, attack, or probe the security or availability of the Service.
				</li>
			</ul>
		</Section>

		<Section>
			<h2 className='legal-h2'>10. Third-Party Services</h2>
			<p className='legal-p'>
				The Service may integrate or link to third-party wallets, RPC providers,
				marketplaces, and analytics tools. Those are governed by their own terms and
				policies. We do not control and are not responsible for any third-party
				services.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>11. Data and Privacy</h2>
			<p className='legal-p'>
				Our handling of data is described in the Privacy Policy and Data Handling
				Policy, which are incorporated into these Terms by reference. Please review
				those documents carefully before using the Service.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>12. Changes</h2>
			<p className='legal-p'>
				We may update these Terms from time to time. Material changes will be noted in
				the interface and/or communicated via our public channels. Your continued use of
				the Service after changes become effective constitutes acceptance of the updated
				Terms.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>13. Severability and Interpretation</h2>
			<p className='legal-p'>
				If any provision of these Terms is found to be unlawful, void, or unenforceable,
				that provision shall be deemed severable and shall not affect the validity and
				enforceability of the remaining provisions.
			</p>
			<p className='legal-p'>
				These Terms shall be construed broadly to protect BEDLAM520nft and its
				developers to the fullest extent permitted by law, while respecting applicable
				consumer protection and mandatory legal rights.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>14. Entire Agreement</h2>
			<p className='legal-p'>
				These Terms, together with the Privacy Policy and Data Handling Policy,
				constitute the entire agreement between you and BEDLAM520nft concerning the
				Service and supersede all prior agreements, understandings, and communications,
				whether written or oral.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>15. Contact</h2>
			<p className='legal-p'>
				If you have questions about these Terms, you can reach us through our{' '}
				<Link
					href='/contact'
					className='text-primary font-medium hover:underline'
				>
					Contact Page
				</Link>
				, or connect with us via the official BEDLAM520nft social channels listed there.
			</p>
			<p className='legal-p'>
				For urgent matters or technical support, please visit{' '}
				<Link
					href='/contact'
					className='text-primary font-medium hover:underline'
				>
					bedlam520nft.vercel.app/contact
				</Link>{' '}
				for the fastest response times.
			</p>
		</Section>
	</article>
);

export const PrivacyContent = ({ mode = 'page' }: LegalContentProps) => (
	<article className='legal-article'>
		<header
			className={`text-center ${mode === 'page' ? 'mb-8' : 'mb-4'} mint-gradient-text`}
		>
			<h1 className='legal-h1'>Privacy Policy</h1>
			<section className='legal-separator mint-border border'></section>
			<p className='legal-p'>Last updated: 26 January 2026</p>
			<section className='legal-separator mint-border border'></section>
		</header>

		<Section>
			<h2 className='legal-h2'>1. What This Policy Covers</h2>
			<p className='legal-p'>
				This Privacy Policy explains how BEDLAM520nft handles information related to
				your use of the Service. Because we operate on public blockchains, some
				information is inherently public and cannot be altered or deleted by us.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>2. Data We Collect</h2>
			<p className='legal-p'>
				We may collect and process the following categories of data:
			</p>
			<ul className='legal-ul'>
				<li>
					<strong>Wallet data:</strong> public wallet addresses you connect, chain IDs,
					nonces, and signatures required for authentication or transactions.
				</li>
				<li>
					<strong>On-chain activity:</strong> mints, transfers, and other transactions
					involving our contracts, as recorded on public blockchains.
				</li>
				<li>
					<strong>Technical data:</strong> basic device, browser, referrer, and
					performance metrics to help keep the site usable and secure.
				</li>
				<li>
					<strong>Support and communication:</strong> messages or communication you
					voluntarily send to us about issues or feedback.
				</li>
			</ul>
		</Section>

		<Section>
			<h2 className='legal-h2'>3. How We Use Information</h2>
			<ul className='legal-ul'>
				<li>To operate and maintain the Service and smart contracts.</li>
				<li>To display your wallet-related activity in the interface.</li>
				<li>To monitor performance, detect abuse, and mitigate fraud or attacks.</li>
				<li>
					To improve the user experience and plan future development, using aggregated
					or anonymized analytics where possible.
				</li>
				<li>To respond to support requests and communicate important updates.</li>
			</ul>
		</Section>

		<Section>
			<h2 className='legal-h2'>4. On-Chain Data and Irreversibility</h2>
			<p className='legal-p'>
				Transactions, wallet addresses, and NFT ownership records stored on a public
				blockchain are generally immutable and publicly accessible. We cannot modify,
				censor, or erase this information. Any privacy controls for on-chain data must
				be provided at the protocol or wallet level, not by this Service.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>5. Sharing and Processors</h2>
			<p className='legal-p'>
				We may use third-party providers (for example, analytics tools, infrastructure
				providers, or RPC endpoints) to help operate the Service. Where we do so, those
				providers process limited data on our behalf under their own terms and policies.
			</p>
			<p className='legal-p'>We do not:</p>
			<ul className='legal-ul'>
				<li>Sell your personal information for marketing lists.</li>
				<li>
					Share wallet-level information with third parties for profiling or
					ad-targeting purposes.
				</li>
			</ul>
		</Section>

		<Section>
			<h2 className='legal-h2'>6. Security and Retention</h2>
			<p className='legal-p'>
				We take reasonable technical and organizational measures to help protect the
				Service and associated infrastructure. However, no online system is perfectly
				secure, and we cannot guarantee absolute security.
			</p>
			<p className='legal-p'>
				Where we store off-chain logs or analytics, we retain them only as long as
				reasonably necessary to operate the Service, debug issues, and meet any legal
				obligations, after which they may be aggregated, anonymized, or deleted.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>7. Your Choices</h2>
			<ul className='legal-ul'>
				<li>You can disconnect your wallet from the interface at any time.</li>
				<li>
					You may adjust browser or device settings (for example, blocking cookies or
					trackers) subject to their impact on functionality.
				</li>
				<li>
					You may choose not to submit support messages or additional contact details if
					you prefer to remain pseudonymous.
				</li>
			</ul>
			<p className='legal-p'>
				Because on-chain data is public and immutable, traditional {'"'}
				right to be forgotten{'"'} requests do not apply to blockchain records we do not
				control.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>8. Children</h2>
			<p className='legal-p'>
				The Service is not directed to children. If you believe a minor has engaged with
				the Service in violation of local laws, you should manage that through wallet
				controls and local legal processes.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>9. Changes</h2>
			<p className='legal-p'>
				We may update this Privacy Policy as the Service evolves. Material changes will
				be reflected in the {'"'}Last updated{'"'} date and may be announced through
				official channels. Continued use after changes means you accept the updated
				Policy.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>10. Contact</h2>
			<p className='legal-p'>
				For privacy-related questions, concerns, or requests, please visit our{' '}
				<Link
					href='/contact'
					className='text-primary font-medium hover:underline'
				>
					Contact Page
				</Link>{' '}
				for the most up-to-date ways to reach us.
			</p>
			<p className='legal-p'>
				We are committed to addressing your privacy concerns promptly and transparently.
				Please include &quot;PRIVACY&quot; in your message subject for fastest routing
				to the appropriate team member.
			</p>
		</Section>
	</article>
);

export const DataPolicyContent = ({ mode = 'page' }: LegalContentProps) => (
	<article className='legal-article'>
		<header
			className={`text-center ${mode === 'page' ? 'mb-8' : 'mb-4'} mint-gradient-text`}
		>
			<h1 className='legal-h1'>Data Handling Policy</h1>
			<section className='legal-separator mint-border border'></section>
			<p className='legal-p'>Last updated: 26 January 2026</p>
		</header>

		<Section>
			<h2 className='legal-h2'>1. Principles</h2>
			<p className='legal-p'>
				This Data Handling Policy describes how BEDLAM520nft approaches collection,
				storage, and processing of data related to the Service. It is intended to be
				read alongside the Privacy Policy and Terms of Service and does not override the
				realities of public blockchain infrastructure.
			</p>
			<ul className='legal-ul'>
				<li>Collect the minimum data necessary to run the Service.</li>
				<li>Prefer pseudonymous or aggregated data where possible.</li>
				<li>Store off-chain data only as long as it is genuinely needed.</li>
				<li>
					Be transparent about what we can and cannot control, especially for on-chain
					data.
				</li>
			</ul>
		</Section>

		<Section>
			<h2 className='legal-h2'>2. Data Categories</h2>
			<ul className='legal-ul'>
				<li>
					<strong>Public blockchain data</strong> (wallet addresses, transactions, token
					IDs, balances) stored on-chain and replicated by node operators globally.
				</li>
				<li>
					<strong>Operational logs</strong> (errors, performance metrics, generic
					request metadata) used for debugging and reliability.
				</li>
				<li>
					<strong>Analytics</strong> (for example, page views, feature usage), which are
					kept minimal and, where possible, aggregated.
				</li>
				<li>
					<strong>Voluntary contact</strong> (for example, messages you send us to
					report issues or ask questions).
				</li>
			</ul>
		</Section>

		<Section>
			<h2 className='legal-h2'>3. Storage and Access</h2>
			<p className='legal-p'>
				Off-chain data may be stored with reputable infrastructure and analytics
				providers. Access to those systems is restricted to the maintainer(s) who need
				it to operate and improve the Service.
			</p>
			<p className='legal-p'>
				We do not maintain large, user-profiled databases tied to real-world identities.
				Interactions are generally keyed to wallet addresses or pseudonyms you choose to
				share.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>4. Retention</h2>
			<p className='legal-p'>
				Where we control storage (for example, logs or analytics), we aim to:
			</p>
			<ul className='legal-ul'>
				<li>
					Retain raw logs only for the period needed to debug issues and ensure
					reliability.
				</li>
				<li>
					Convert data to aggregated or anonymized form where detailed records are no
					longer necessary.
				</li>
				<li>Delete or archive obsolete data on a rolling basis.</li>
			</ul>
			<p className='legal-p'>
				On-chain data is not subject to our retention policies because it is not under
				our control.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>5. Incident Handling</h2>
			<p className='legal-p'>
				If we become aware of a security issue affecting systems under our control, we
				will:
			</p>
			<ul className='legal-ul'>
				<li>Investigate and mitigate the issue as quickly as reasonably possible.</li>
				<li>
					Review and, where appropriate, adjust our security practices to reduce
					recurrence.
				</li>
				<li>
					Communicate relevant information via official channels where users need to
					take action.
				</li>
			</ul>
			<p className='legal-p'>
				This does not extend to incidents solely involving third-party services, user
				wallets, or on-chain protocols we do not operate.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>6. Relationship to Other Policies</h2>
			<p className='legal-p'>
				This Data Handling Policy supplements the Privacy Policy and Terms of Service.
				In the event of a conflict, the Terms of Service control your use of the
				Service, and the Privacy Policy governs how we describe privacy-related
				practices.
			</p>
		</Section>

		<Section>
			<h2 className='legal-h2'>7. Questions and Feedback</h2>
			<p className='legal-p'>
				If you have questions about our data handling practices or wish to provide
				feedback on how we can improve, please visit our{' '}
				<Link
					href='/contact'
					className='text-primary font-medium hover:underline'
				>
					Contact Page
				</Link>
				.
			</p>
			<p className='legal-p'>
				We welcome constructive feedback and are committed to maintaining transparent
				and responsible data practices. For data-specific inquiries, include &quot;DATA
				HANDLING&quot; in your message subject.
			</p>
		</Section>
	</article>
);
