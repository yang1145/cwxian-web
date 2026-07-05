import { Container } from "@/components/layout/Container";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="section-padding gradient-bg">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            创业者的真实反馈
          </h2>
          <p className="mt-4 text-lg text-primary-100">
            听听已入驻项目怎么说。
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm"
            >
              <Quote className="h-8 w-8 text-accent-400" aria-hidden="true" />
              <p className="mt-4 text-base text-white/90">
                {testimonial.content}
              </p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-sm text-primary-200">
                  {testimonial.role} · {testimonial.project}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
