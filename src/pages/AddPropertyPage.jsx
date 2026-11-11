import { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, House, MapPin, ImagePlus, X } from "lucide-react";

import { useProperties } from "../context/useProperties";

function readImageAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Image could not be read."));

    reader.readAsDataURL(file);
  });
}

function AddPropertyPage() {
  const [images, setImages] = useState([]);
  const [propertyType, setPropertyType] = useState("Apartment");
  const [listingType, setListingType] = useState("For Rent");
  const { agentProperties, addProperty, updateProperty } = useProperties();
  const [existingImages, setExistingImages] = useState([]);

  const { id } = useParams();

  const editingProperty = id
    ? agentProperties.find((property) => property.id === Number(id))
    : null;

  const isEditing = Boolean(editingProperty);

  useEffect(() => {
    if (!editingProperty || !formRef.current) return;

    const form = formRef.current;

    form.elements.namedItem("name").value = editingProperty.name || "";

    form.elements.namedItem("description").value =
      editingProperty.description || "";

    form.elements.namedItem("bedrooms").value = editingProperty.bedrooms || "";

    form.elements.namedItem("bathrooms").value =
      editingProperty.bathrooms || "";

    form.elements.namedItem("size").value = editingProperty.size || "";

    form.elements.namedItem("price").value = editingProperty.price || "";

    form.elements.namedItem("location").value = editingProperty.location || "";

    setPropertyType(editingProperty.type || "Apartment");
    setListingType(editingProperty.status || "For Rent");

    setExistingImages(
      editingProperty.images ||
        (editingProperty.image
          ? [{ src: editingProperty.image, label: "Property image" }]
          : []),
    );
  }, [editingProperty]);

  const formRef = useRef(null);
  const [message, setMessage] = useState("");

  function validateProperty(formData) {
    const name = formData.get("name")?.trim();
    const description = formData.get("description")?.trim();
    const size = formData.get("size")?.trim();
    const location = formData.get("location")?.trim();
    const price = Number(formData.get("price"));
    const bedrooms = formData.get("bedrooms");
    const bathrooms = formData.get("bathrooms");

    if (!name || name.length < 3) {
      return "Property name must contain at least 3 characters.";
    }

    if (!description || description.length < 20) {
      return "Please provide a description of at least 20 characters.";
    }

    if (!size) {
      return "Please enter the property size.";
    }

    if (!location || location.length < 3) {
      return "Please enter a valid property location.";
    }

    if (!Number.isFinite(price) || price <= 0) {
      return "Please enter a valid property price.";
    }

    if (propertyType !== "Land") {
      if (bedrooms !== "" && Number(bedrooms) < 0) {
        return "Bedrooms cannot be negative.";
      }

      if (bathrooms !== "" && Number(bathrooms) < 0) {
        return "Bathrooms cannot be negative.";
      }
    }

    if (existingImages.length === 0 && images.length === 0) {
      return "Please upload at least one property image.";
    }

    return "";
  }

  async function saveProperty(listingStatus) {
    try {
      const formData = new FormData(formRef.current);

      if (listingStatus === "Pending Review") {
        const validationError = validateProperty(formData);

        if (validationError) {
          setMessage(validationError);
          return;
        }
      }

      setMessage("");

      const hasInformation =
        formData.get("name")?.trim() ||
        formData.get("description")?.trim() ||
        formData.get("location")?.trim() ||
        formData.get("price") ||
        formData.get("size")?.trim() ||
        existingImages.length > 0 ||
        images.length > 0;

      if (listingStatus === "Draft" && !hasInformation) {
        setMessage(
          "Please enter at least one property detail before saving a draft.",
        );
        return;
      }

      const newImages = await Promise.all(
        images.map(async (image) => ({
          src: await readImageAsDataURL(image),
          label: image.name,
        })),
      );

      const allImages = [...existingImages, ...newImages];

      const propertyData = {
        name: formData.get("name"),
        type: propertyType,
        description: formData.get("description"),
        status: listingType,
        price: formData.get("price"),
        priceSuffix: listingType === "For Rent" ? "/ year" : "",
        location: formData.get("location"),
        bedrooms: formData.get("bedrooms") || "",
        bathrooms: formData.get("bathrooms") || "",
        size: formData.get("size"),
        image: allImages[0]?.src || "",
        images: allImages,
        agentId: editingProperty?.agentId || "demo-agent",
      };

      if (isEditing) {
        updateProperty(editingProperty.id, {
          ...propertyData,
          listingStatus,
        });

        setMessage("Your property has been updated successfully!");
      } else {
        addProperty(propertyData, listingStatus);

        setMessage(
          listingStatus === "Draft"
            ? "Your property has been saved as a draft!"
            : "Your property has been submitted for admin approval!",
        );
      }
    } catch (error) {
      setMessage("Something went wrong while saving your property.");
      console.error(error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveProperty("Pending Review");
  }

  function handleImageChange(event) {
    const selectedImages = Array.from(event.target.files);

    setImages((currentImages) => [...currentImages, ...selectedImages]);
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Link */}
        <Link
          to="/dashboard/agent"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C] hover:underline"
        >
          <ArrowLeft size={18} />
          Back to dashboard
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#174C3C]/10">
            <House size={25} className="text-[#174C3C]" />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#252925]">
            Add a Property
          </h1>

          <p className="mt-2 text-gray-600">
            Provide accurate property information to create your listing.
          </p>
        </div>

        {/* Property Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#252925]">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Start with the essential details of your property.
            </p>

            <div className="mt-6 space-y-5">
              {/* Property Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Property Name
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Contemporary Luxury Apartment"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#174C3C]"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Property Type
                </label>

                <select
                  name="type"
                  value={propertyType}
                  onChange={(event) => setPropertyType(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial Property</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Property Description
                </label>

                <textarea
                  name="description"
                  required
                  rows="5"
                  placeholder="Describe the property, its features and surroundings..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                />
              </div>
            </div>
          </section>

          {/* Property Features */}
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#252925]">
              Property Features
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add the physical details of the property.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {/* Bedrooms */}
              {propertyType !== "Land" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Bedrooms
                  </label>

                  <input
                    type="number"
                    name="bedrooms"
                    min="0"
                    placeholder="e.g. 3"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                  />
                </div>
              )}

              {/* Bathrooms */}
              {propertyType !== "Land" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Bathrooms
                  </label>

                  <input
                    type="number"
                    name="bathrooms"
                    min="0"
                    placeholder="e.g. 3"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                  />
                </div>
              )}

              {/* Property Size */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold">
                  Property Size
                </label>

                <input
                  type="text"
                  name="size"
                  required
                  placeholder="e.g. 180 sqm or 600 sqm"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                />
              </div>
            </div>
          </section>

          {/* Listing Details */}
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#252925]">
              Listing Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Tell potential buyers or tenants about the listing.
            </p>

            <div className="mt-6 space-y-5">
              {/* Listing Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Listing Type
                </label>

                <select
                  name="status"
                  value={listingType}
                  onChange={(event) => setListingType(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                >
                  <option value="For Rent">For Rent</option>
                  <option value="For Sale">For Sale</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Price (₦)
                </label>

                <input
                  type="number"
                  name="price"
                  required
                  min="1"
                  placeholder="e.g. 3500000"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Property Location
                </label>

                <div className="relative">
                  <MapPin
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="e.g. Lekki Phase 1, Lagos"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#174C3C]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Property Images */}
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#252925]">
              Property Images
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Upload clear pictures of the property.
            </p>

            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-[#174C3C]">
              <ImagePlus size={35} className="text-[#174C3C]" />

              <span className="mt-3 font-semibold text-[#252925]">
                Click to upload images
              </span>

              <span className="mt-1 text-sm text-gray-500">
                PNG, JPG or WEBP
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {(existingImages.length > 0 || images.length > 0) && (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {existingImages.map((image, index) => (
                  <div key={`existing-${index}`} className="relative">
                    <img
                      src={image.src}
                      alt={image.label}
                      className="h-32 w-full rounded-xl object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setExistingImages((current) =>
                          current.filter(
                            (_, imageIndex) => imageIndex !== index,
                          ),
                        )
                      }
                      className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-red-600 shadow"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {images.map((image, index) => (
                  <div key={`${image.name}-${index}`} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Property ${index + 1}`}
                      className="h-36 w-full rounded-xl object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setImages((currentImages) =>
                          currentImages.filter((_, i) => i !== index),
                        )
                      }
                      className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-red-500 shadow"
                    >
                      <X size={17} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Submission Actions */}
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            {message && (
              <p className="mb-5 rounded-xl bg-[#174C3C]/10 p-4 text-sm font-medium text-[#174C3C]">
                {message}
              </p>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => saveProperty("Draft")}
                className="rounded-xl border border-[#174C3C] px-6 py-3 font-semibold text-[#174C3C] transition hover:bg-[#174C3C]/5"
              >
                {isEditing ? "Save Changes as Draft" : "Save as Draft"}
              </button>

              <button
                type="submit"
                className="rounded-xl bg-[#174C3C] px-6 py-3 font-semibold text-white transition hover:bg-[#103A2D]"
              >
                {isEditing ? "Save Changes & Submit" : "Submit for Approval"}
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

export default AddPropertyPage;
