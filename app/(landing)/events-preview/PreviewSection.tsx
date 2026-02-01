import Link from "next/link";
import Container from "@/components/_core/layout/Container";
import DraggableEventsCarousel from "@/components/ui/DraggableEventsCarousel";
import type { Workshop } from "@/lib/api";
import workshopsData from "@/workshops.json";

const WORKSHOP_IMAGES: Record<string, string> = {
  "byog-workshop": "/images/workshop-images/Build Your own Game.jpg",
  "cybersecurity-ai-workshop": "/images/workshop-images/Cyber Security an AI.jpg",
  "blockchain-workshop": "/images/workshop-images/Inside a block chain.jpg",
  "snn-workshop": "/images/workshop-images/Spiking Neural Network.jpg",
  "mcp-ai-workshop": "/images/workshop-images/MCP and AI.png",
};

export default function PreviewSection() {
  type PreviewItem = { title: string; desc: string; tag: string; image: string; slug: string };

  // Map workshops from static JSON data
  const items: PreviewItem[] = (workshopsData as Workshop[]).map((w: Workshop) => ({
    title: w.title,
    desc: w.description,
    tag: w.instructor, // Using instructor as the tag
    image: WORKSHOP_IMAGES[w.workshop_id] || w.image_url,
    slug: w.workshop_id,
  }));

  const hasItems = items.length > 0;

  return (
    <section className="relative py-28 bg-black overflow-hidden">
      {/* HEADER */}
      <Container>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-zen-dots)] tracking-tight text-white uppercase">
              <span className="text-red-600">Workshops</span>
            </h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-red-600 to-red-400 rounded-full" />
          </div>

          <Link
            href="/workshops"
            className="text-sm font-semibold text-red-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            View All →
          </Link>
        </div>
      </Container>

      {hasItems ? (
        <DraggableEventsCarousel items={items} basePath="/workshops" />
      ) : (
        <div className="flex h-64 items-center justify-center text-gray-500">
          <p>No workshops available at the moment.</p>
        </div>
      )}
    </section>
  );
}
