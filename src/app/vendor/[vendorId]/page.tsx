import ImageSlider from "@/components/ImageSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VENDOR_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCheck, Facebook, Heart, Instagram, MapPin } from "lucide-react";

import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import LikeButton from "@/components/LikeButton";
import { toast } from "sonner";
import Badge from "@/components/Badge";
import EnquireButton from "@/components/EnquireButton";

import React, { Fragment } from "react";
//@ts-ignore
import escapeHtml from "escape-html";
import { Text } from "slate";
import DirectChat from "@/components/chat/DirectChat";

interface PageProps {
  params: {
    vendorId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const { vendorId } = params;

  const payload = await getPayloadClient();

  const { docs: vendors } = await payload.find({
    collection: "vendors",
    limit: 1,
    where: {
      id: {
        equals: vendorId,
      },
    },
  });

  const [product] = vendors;

  if (!product) return notFound();

  const label = VENDOR_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  // @ts-ignore
  const smallCapsLabel = label.toLowerCase();

  const value = VENDOR_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const vendCatLabel = (string: string) => {
    const category = VENDOR_CATEGORIES.find((cat) => cat.value === string);

    if (!category) {
      return null;
    }

    return category.label;
  };

  const BREADCRUMBS = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Vendors", href: "/vendors" },
    { id: 3, name: label, href: `/vendors?category=${value}` },
  ];

  const validUrls = product.images
    // @ts-ignore
    .map(({ image }) => image.url) as string[];

  const { docs: packages } = await payload.find({
    collection: "packages",
    where: {
      vendor: {
        equals: vendorId,
      },
    },
  });

  //@ts-ignore
  const serialize = (children) =>
    //@ts-ignore
    children.map((node, i) => {
      if (Text.isText(node)) {
        let text = (
          <span dangerouslySetInnerHTML={{ __html: escapeHtml(node.text) }} />
        );
        //@ts-ignore
        if (node.bold) {
          text = <strong key={i}>{text}</strong>;
        }
        //@ts-ignore
        if (node.code) {
          text = <code key={i}>{text}</code>;
        }
        //@ts-ignore
        if (node.italic) {
          text = <em key={i}>{text}</em>;
        }

        // Handle other leaf types here...

        return <Fragment key={i}>{text}</Fragment>;
      }

      if (!node) {
        return null;
      }

      switch (node.type) {
        case "h1":
          return <h1 key={i}>{serialize(node.children)}</h1>;
        // Iterate through all headings here...
        case "h6":
          return <h6 key={i}>{serialize(node.children)}</h6>;
        case "blockquote":
          return <blockquote key={i}>{serialize(node.children)}</blockquote>;
        case "ul":
          return (
            <ul key={i} className="list-disc leading-relaxed">
              {serialize(node.children)}
            </ul>
          );
        case "ol":
          return <ol key={i}>{serialize(node.children)}</ol>;
        case "li":
          return <li key={i}>{serialize(node.children)}</li>;
        case "link":
          return (
            <Link
              href={escapeHtml(node.url)}
              key={i}
              target="_blank"
              className="no-underline hover:underline text-blue-500"
            >
              {serialize(node.children)}
            </Link>
          );

        default:
          return <p key={i}>{serialize(node.children)}</p>;
      }
    });

  return (
    <>
      <div className="bg-[url('/hero.png')] bg-cover bg-center shadow-lg mb-10">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 py-3 items-center">
            <div className="aspect-square rounded-lg">
              <ImageSlider urls={validUrls} />
            </div>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:gap-x-8 lg:px-14">
              {/* Product Details */}
              <div className="lg:max-w-lg lg:self-end">
                <ol className="hidden md:flex items-center space-x-2 pb-10">
                  {BREADCRUMBS.map((breadcrumb, i) => (
                    <li key={breadcrumb.href}>
                      <div className="flex items-center text-sm gap-2">
                        <Link
                          href={breadcrumb.href}
                          className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                        >
                          {breadcrumb.name}
                        </Link>
                        {i !== BREADCRUMBS.length - 1 ? (
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                          >
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                          </svg>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="bg-white p-6 rounded-sm shadow-md">
                  <div className="mt-4">
                    <h1 className="flex items-baseline gap-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      {product.name}
                      <span>
                        <Badge vendorRole={product.venduserid.role} />
                      </span>
                    </h1>
                    <p className="text-balance text-muted-foreground mt-3 flex gap-2 items-center">
                      <MapPin className="h-6 w-6 text-gray-400" />
                      {product.location ? (
                        product.location
                      ) : (
                        <span className="text-slate-400 italic">
                          Vendor location not disclosed
                        </span>
                      )}
                    </p>
                  </div>

                  <section className="mt-4">
                    <div className="flex items-center gap-4">
                      {product.facebook ? (
                        <Link href={product.facebook} target="_blank">
                          <Facebook className="h-6 w-6 flex-shrink-0 text-gray-400 cursor-pointer hover:text-gray-500" />
                        </Link>
                      ) : null}
                      {product.instagram ? (
                        <Link href={product.instagram} target="_blank">
                          <Instagram className="h-6 w-6 flex-shrink-0 text-gray-400 cursor-pointer hover:text-gray-500" />
                        </Link>
                      ) : null}
                    </div>
                    {product.details ? (
                      <div className="mt-4 space-y-6 text-base text-muted-foreground">
                        {serialize(product.details)}
                      </div>
                    ) : (
                      <div className="mt-4 space-y-6 text-base text-muted-foreground">
                        <p className="text-slate-400 italic">
                          Vendor details not disclosed.
                        </p>
                      </div>
                    )}

                    {/* Enquire */}
                    <div className="group flex items-center gap-8 text-sm text-medium mt-10">
                      {user ? (
                        // <EnquireButton
                        //   vendorId={product.id}
                        //   userEmail={user.email}
                        // />
                        <DirectChat
                          vendor={product}
                          user={user}
                          image={validUrls[0]}
                          label="Chat Now"
                        />
                      ) : null}
                      {user ? (
                        <LikeButton vendor={product} user={user.id} />
                      ) : (
                        <Heart
                          aria-hidden="true"
                          className="h-6 w-6 flex-shrink-0 text-gray-400 cursor-pointer"
                          onClick={() => {
                            toast.error("You have to be logged in first.");
                          }}
                        />
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper className="bg-white">
        {packages.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Packages</TableHead>
                <TableHead className="w-[200px]">Services</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* @ts-ignore */}
              {packages.map((packageItem) => (
                <TableRow key={packageItem.name}>
                  <TableCell className="font-semibold">
                    {packageItem.name}
                  </TableCell>
                  <TableCell>
                    {packageItem.services.map((service: string) => (
                      <div key={service} className="flex gap-3 items-center">
                        <CheckCheck className="w-4 h-4 text-lime-500" />
                        <p>{vendCatLabel(service)}</p>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {packageItem.packageDetails ? (
                      serialize(packageItem.packageDetails)
                    ) : (
                      <p className="text-slate-400 italic">
                        Package details not disclosed
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {packageItem.price ? (
                      formatPrice(packageItem.price)
                    ) : (
                      <p className="text-slate-400 italic">
                        Price not disclosed
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}

        <ProductReel
          href="/products"
          user={user?.id}
          idvPage={true}
          query={{ category: product.category, limit: 4 }}
          title={`Browse similar vendors`}
          subtitle={`Here are some ${smallCapsLabel.toLowerCase()} we think you might like`}
          vendorName={product.name}
        />
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
