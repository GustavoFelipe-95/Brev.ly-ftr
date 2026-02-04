CREATE TABLE "short_links" (
	"id" text PRIMARY KEY NOT NULL,
	"original_link" text NOT NULL,
	"shortened_link" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "short_links_shortened_link_unique" UNIQUE("shortened_link")
);
