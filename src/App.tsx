import React, { useState } from 'react';
import {
  UserPersona,
  ActiveTab,
  Contractor,
  JobPosting,
  JobApplication,
  CandidateStatus,
  AIResumeMatch,
  GPContract,
  GPInvoice
} from './types';
import {
  INITIAL_CONTRACTORS,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_CUSTOMER_CONTRACTS,
  INITIAL_CONTRACTOR_CONTRACTS,
  INITIAL_CUSTOMER_INVOICES,
  INITIAL_CONTRACTOR_INVOICES
} from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { TalentMarketplace } from './components/customer/TalentMarketplace';
import { PostJobModal } from './components/customer/PostJobModal';
import { ContractGeneratorModal } from './components/customer/ContractGeneratorModal';
import { FindJobs } from './components/contractor/FindJobs';
import { InviteClientModal } from './components/contractor/InviteClientModal';
import { MeridianContractsView } from './components/shared/MeridianContractsView';
import { MeridianInvoicesView } from './components/shared/MeridianInvoicesView';
import { HomeView } from './components/shared/HomeView';
import { ToastNotification, ToastMessage } from './components/shared/ToastNotification';

export default function App() {
  const [currentPersona, setCurrentPersona] = useState<UserPersona>('customer');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  const [contractors] = useState<Contractor[]>(INITIAL_CONTRACTORS);
  const [jobs, setJobs] = useState<JobPosting[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<JobApplication[]>(INITIAL_APPLICATIONS);
  const [customerContracts, setCustomerContracts] = useState<GPContract[]>(INITIAL_CUSTOMER_CONTRACTS);
  const [contractorContracts, setContractorContracts] = useState<GPContract[]>(INITIAL_CONTRACTOR_CONTRACTS);
  const [customerInvoices, setCustomerInvoices] = useState<GPInvoice[]>(INITIAL_CUSTOMER_INVOICES);
  const [contractorInvoices] = useState<GPInvoice[]>(INITIAL_CONTRACTOR_INVOICES);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(['job-1']);

  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isInviteClientModalOpen, setIsInviteClientModalOpen] = useState(false);
  const [contractCandidate, setContractCandidate] = useState<{
    applicationId: string;
    name: string;
    role: string;
    country: string;
    rate: number;
  } | null>(null);

  const [toast, setToast] = useState<ToastMessage | null>(null);

  const handleJobCreated = (newJob: JobPosting) => {
    setJobs(prev => [newJob, ...prev]);
    setToast({
      id: `toast-${Date.now()}`,
      type: 'success',
      title: 'Project Published to Indeed',
      description: newJob.isSponsored
        ? `"${newJob.title}" is live with Sponsored Boost ($4/day Contractor Express rate).`
        : `"${newJob.title}" is live on Indeed.`
    });
  };

  const handleApplyToJob = (job: JobPosting, customNote?: string, customRate?: number) => {
    if (appliedJobIds.includes(job.id)) return;
    setAppliedJobIds(prev => [...prev, job.id]);

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      contractorId: 'c-1',
      contractorName: 'Mateusz Kowalski',
      contractorTitle: 'Senior Cloud & Go Architect',
      contractorCountry: 'Poland',
      requestedRate: customRate || 72,
      appliedDate: 'Just now',
      note:
        customNote ||
        'Applied via ProjectMatch 1-Click with verified Contractor Express profile.',
      status: 'New'
    };

    setApplications(prev => [newApp, ...prev]);
    setToast({
      id: `toast-${Date.now()}`,
      type: 'success',
      title: 'Application Submitted',
      description: `Your Contractor Express profile and tailored pitch were sent to ${job.company} for "${job.title}".`
    });
  };

  const handleSaveCandidateAIMatch = (applicationId: string, aiMatch: AIResumeMatch) => {
    setApplications(prev =>
      prev.map(app => (app.id === applicationId ? { ...app, aiMatch } : app))
    );
  };

  const handleUpdateCandidateStatus = (applicationId: string, newStatus: CandidateStatus) => {
    const targetApp = applications.find(a => a.id === applicationId);

    setApplications(prev =>
      prev.map(app => (app.id === applicationId ? { ...app, status: newStatus } : app))
    );

    if (newStatus === 'Interviewing') {
      setToast({
        id: `toast-${Date.now()}`,
        type: 'info',
        title: 'Candidate Moved to Interviewing',
        description: 'Status updated to Interviewing.'
      });
    } else if (newStatus === 'Rejected') {
      setToast({
        id: `toast-${Date.now()}`,
        type: 'warning',
        title: 'Candidate Rejected',
        description: 'Application marked as Rejected.'
      });
    } else if (newStatus === 'Terminated' && targetApp) {
      setCustomerContracts(prev => {
        const exists = prev.some(
          c => c.contractorName === targetApp.contractorName && c.role === targetApp.jobTitle
        );
        if (exists) {
          return prev.map(c =>
            c.contractorName === targetApp.contractorName && c.role === targetApp.jobTitle
              ? { ...c, status: 'Terminated' }
              : c
          );
        }
        const terminatedContract: GPContract = {
          id: `CE-${Math.floor(1000 + Math.random() * 9000)}`,
          contractorName: targetApp.contractorName,
          clientCompany: 'Lumina Global Services',
          country: targetApp.contractorCountry,
          role: targetApp.jobTitle,
          rate: targetApp.requestedRate,
          startDate: '2026-11-15',
          duration: '4 months',
          status: 'Terminated',
          source: 'ProjectMatch (Indeed)',
          docusignEnvelopeId: targetApp.docusignEnvelopeId
        };
        return [terminatedContract, ...prev];
      });

      if (targetApp.contractorName === 'Mateusz Kowalski') {
        setContractorContracts(prev =>
          prev.map(c =>
            c.role === targetApp.jobTitle ? { ...c, status: 'Terminated' } : c
          )
        );
      }

      setToast({
        id: `toast-${Date.now()}`,
        type: 'warning',
        title: 'Contractor Contract Terminated',
        description: `${targetApp.contractorName}'s contract for "${targetApp.jobTitle}" is now marked as Terminated.`
      });
    }
  };

  const handleTerminateContract = (contractId: string) => {
    const targetContract = customerContracts.find(c => c.id === contractId);

    setCustomerContracts(prev =>
      prev.map(c => (c.id === contractId ? { ...c, status: 'Terminated' } : c))
    );
    setContractorContracts(prev =>
      prev.map(c => (c.id === contractId ? { ...c, status: 'Terminated' } : c))
    );

    if (targetContract) {
      setApplications(prev =>
        prev.map(app =>
          app.contractorName === targetContract.contractorName &&
          app.jobTitle === targetContract.role
            ? { ...app, status: 'Terminated' }
            : app
        )
      );
    }

    setToast({
      id: `toast-${Date.now()}`,
      type: 'warning',
      title: 'Contract Terminated',
      description: targetContract
        ? `Contract ${contractId} (${targetContract.contractorName}) has been marked as Terminated.`
        : `Contract ${contractId} has been marked as Terminated.`
    });
  };

  const handleSendViaDocuSign = (
    applicationId: string,
    contractDetails: {
      contractorName: string;
      country: string;
      role: string;
      rate: number;
      startDate: string;
      duration: string;
      docusignEnvelopeId: string;
    }
  ) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId
          ? {
              ...app,
              status: 'Contract Sent via DocuSign',
              requestedRate: contractDetails.rate,
              docusignEnvelopeId: contractDetails.docusignEnvelopeId
            }
          : app
      )
    );

    setToast({
      id: `toast-${Date.now()}`,
      type: 'info',
      title: 'DocuSign Contract Emailed to Contractor',
      description: `${contractDetails.country} agreement (${contractDetails.docusignEnvelopeId}) emailed via DocuSign. Ready to onboard ${contractDetails.contractorName}.`
    });
  };

  const handleCompleteOnboarding = (applicationId: string) => {
    const app = applications.find(a => a.id === applicationId);
    if (!app) return;

    setApplications(prev =>
      prev.map(a => (a.id === applicationId ? { ...a, status: 'Onboarded' } : a))
    );

    setCustomerContracts(prev => {
      const existing = prev.find(
        c => c.contractorName === app.contractorName && c.role === app.jobTitle
      );
      if (existing) {
        return prev.map(c =>
          c.id === existing.id ? { ...c, status: 'Active' } : c
        );
      }
      const newContract: GPContract = {
        id: `CE-${Math.floor(1000 + Math.random() * 9000)}`,
        contractorName: app.contractorName,
        clientCompany: 'Lumina Global Services',
        country: app.contractorCountry,
        role: app.jobTitle,
        rate: app.requestedRate,
        startDate: '2026-11-15',
        duration: '4 months',
        status: 'Active',
        source: 'ProjectMatch (Indeed)',
        docusignEnvelopeId: app.docusignEnvelopeId
      };
      return [newContract, ...prev];
    });

    if (app.contractorName === 'Mateusz Kowalski') {
      setContractorContracts(prev => {
        const existing = prev.find(c => c.role === app.jobTitle);
        if (existing) {
          return prev.map(c =>
            c.id === existing.id ? { ...c, status: 'Active' } : c
          );
        }
        const newContract: GPContract = {
          id: `CE-${Math.floor(1000 + Math.random() * 9000)}`,
          contractorName: app.contractorName,
          clientCompany: 'Lumina Global Services',
          country: app.contractorCountry,
          role: app.jobTitle,
          rate: app.requestedRate,
          startDate: '2026-11-15',
          duration: '4 months',
          status: 'Active',
          source: 'ProjectMatch (Indeed)',
          docusignEnvelopeId: app.docusignEnvelopeId
        };
        return [newContract, ...prev];
      });
    }

    setToast({
      id: `toast-${Date.now()}`,
      type: 'success',
      title: 'Contractor Onboarded to Contractor Express',
      description: `${app.contractorName} is now Onboarded and active in your Contracts tab.`
    });
  };

  const handleApproveInvoice = (invoiceId: string) => {
    setCustomerInvoices(prev =>
      prev.map(inv => (inv.id === invoiceId ? { ...inv, status: 'Paid' } : inv))
    );
    setToast({
      id: `toast-${Date.now()}`,
      type: 'success',
      title: 'Invoice Approved & Paid',
      description: `Invoice ${invoiceId} settled via Contractor Express payment rails.`
    });
  };

  const handleInviteContractorToProject = (contractor: Contractor, project: JobPosting) => {
    const existing = applications.find(
      a => a.jobId === project.id && a.contractorName === contractor.name
    );
    if (existing) return;

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: project.id,
      jobTitle: project.title,
      contractorId: contractor.id,
      contractorName: contractor.name,
      contractorTitle: contractor.title,
      contractorCountry: contractor.country,
      requestedRate: contractor.hourlyRate,
      appliedDate: 'Just now',
      note: `Sourced from Indeed Directory for ${project.title}.`,
      status: 'Interviewing'
    };

    setApplications(prev => [newApp, ...prev]);
    setToast({
      id: `toast-${Date.now()}`,
      type: 'info',
      title: 'Candidate Shortlisted for Interview',
      description: `${contractor.name} added to "${project.title}" with Interviewing status.`
    });
  };

  const handleInviteSent = (companyName: string, clientEmail: string, role: string, rate: number) => {
    const invitedContract: GPContract = {
      id: `CE-${Math.floor(1000 + Math.random() * 9000)}`,
      contractorName: 'Mateusz Kowalski',
      clientCompany: companyName,
      country: 'Poland',
      role,
      rate,
      startDate: '2026-11-20',
      duration: '4 months',
      status: 'Pending Signature',
      source: 'Contractor Invite'
    };
    setContractorContracts(prev => [invitedContract, ...prev]);
    setActiveTab('contracts');
    setToast({
      id: `toast-${Date.now()}`,
      type: 'success',
      title: 'Client Invitation Sent',
      description: `Invitation sent to ${clientEmail} (${companyName}) to open a Contractor Express account and sign your contract.`
    });
  };

  const pendingApplicantsCount = applications.filter(
    a =>
      a.status === 'New' ||
      a.status === 'Applied' ||
      a.status === 'Interviewing' ||
      a.status === 'Hire' ||
      a.status === 'Contract Sent via DocuSign'
  ).length;

  const activeContractsList = currentPersona === 'customer' ? customerContracts : contractorContracts;
  const activeInvoicesList = currentPersona === 'customer' ? customerInvoices : contractorInvoices;

  return (
    <div id="top" className="min-h-screen flex bg-slate-50 text-slate-900">
      
      <Sidebar
        currentPersona={currentPersona}
        onSelectPersona={setCurrentPersona}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        contractsCount={activeContractsList.length}
        invoicesCount={activeInvoicesList.length}
        pendingApplicantsCount={pendingApplicantsCount}
        onOpenPostJob={() => setIsPostJobModalOpen(true)}
        onOpenInviteClient={() => setIsInviteClientModalOpen(true)}
      />

      <main className="flex-1 max-w-6xl p-6 md:p-8 overflow-y-auto">
          {activeTab === 'home' && (
            <HomeView
              currentPersona={currentPersona}
              jobs={jobs}
              applications={applications}
              contracts={activeContractsList}
              invoices={activeInvoicesList}
              appliedJobIds={appliedJobIds}
              onNavigate={setActiveTab}
              onOpenPostJob={() => setIsPostJobModalOpen(true)}
              onOpenInviteClient={() => setIsInviteClientModalOpen(true)}
            />
          )}

          {activeTab === 'project_match' && (
            currentPersona === 'customer' ? (
              <TalentMarketplace
                contractors={contractors}
                jobs={jobs}
                applications={applications}
                onOpenPostJob={() => setIsPostJobModalOpen(true)}
                onUpdateCandidateStatus={handleUpdateCandidateStatus}
                onOpenContractModal={candidate => setContractCandidate(candidate)}
                onCompleteOnboarding={handleCompleteOnboarding}
                onInviteContractorToProject={handleInviteContractorToProject}
                onNavigateToContracts={() => setActiveTab('contracts')}
                onSaveCandidateAIMatch={handleSaveCandidateAIMatch}
              />
            ) : (
              <FindJobs
                jobs={jobs}
                contractorProfile={contractors[0]}
                appliedJobIds={appliedJobIds}
                applications={applications}
                onApplyToJob={handleApplyToJob}
                onOpenInviteClient={() => setIsInviteClientModalOpen(true)}
              />
            )
          )}

          {activeTab === 'contracts' && (
            <MeridianContractsView
              contracts={activeContractsList}
              currentPersona={currentPersona}
              onGoToProjectMatch={() => setActiveTab('project_match')}
              onTerminateContract={handleTerminateContract}
            />
          )}

          {activeTab === 'invoices' && (
            <MeridianInvoicesView
              invoices={activeInvoicesList}
              currentPersona={currentPersona}
              onApproveInvoice={handleApproveInvoice}
            />
          )}
      </main>

      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        onJobCreated={handleJobCreated}
      />

      <InviteClientModal
        isOpen={isInviteClientModalOpen}
        onClose={() => setIsInviteClientModalOpen(false)}
        onInviteSent={handleInviteSent}
      />

      <ContractGeneratorModal
        isOpen={Boolean(contractCandidate)}
        onClose={() => setContractCandidate(null)}
        candidate={contractCandidate}
        onSendViaDocuSign={handleSendViaDocuSign}
      />

      <ToastNotification
        toast={toast}
        onDismiss={() => setToast(null)}
      />

    </div>
  );
}
