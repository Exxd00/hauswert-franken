import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getProjectById, getAllProjects } from '@/lib/data/projects';
import { ProjectDetailContent } from './project-detail-content';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(Number(id));

  if (!project) {
    return {
      title: 'Projekt nicht gefunden',
    };
  }

  return {
    title: `${project.title} | RD Frankenbau`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(Number(id));

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const otherProjects = allProjects.filter(p => p.id !== project.id).slice(0, 3);

  return (
    <>
      <Header />
      <main className="pt-24">
        <ProjectDetailContent project={project} otherProjects={otherProjects} />
      </main>
      <Footer />
    </>
  );
}
