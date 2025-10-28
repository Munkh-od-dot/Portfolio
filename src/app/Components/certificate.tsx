"use client";

import { useState } from "react";
import { certificates, categories } from "../../lib/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Award } from "lucide-react";
import Image from "next/image";

export function CertificatesSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCertificates =
    selectedCategory === "All"
      ? certificates
      : certificates.filter((cert) => cert.category === selectedCategory);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">Certificates</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Key certifications and courses completed to enhance my technical and
            individuality expertise
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.certificates.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <Card
              key={cert.id}
              className="overflow-hidden group hover:shadow-lg transition-shadow"
            >
              {/* Certificate Image */}
              <div className="relative h-48 bg-muted overflow-hidden">
                <Image
                  src={cert.imageUrl || "/placeholder.svg"}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                    {cert.category}
                  </span>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {cert.issuer}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {new Date(cert.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                {cert.credentialUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group/btn bg-transparent"
                    asChild
                  >
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Credential
                      <ExternalLink className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No certificates found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
