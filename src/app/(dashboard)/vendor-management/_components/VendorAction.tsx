"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/SidebarScrollArea";
import VeganModal from "@/components/ui/vegan-modal";
import type { User } from "@/types/admin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, CheckCircle, MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { DeleteVendorModal } from "./delete-vendor";
// import EditeCupon from "./EditeCupon";

interface Props {
  user: User;
}

const VendorAction = ({ user }: Props) => {
  //   const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState("");

  const queryClient = useQueryClient();

  const { mutate: approveLicense } = useMutation({
    mutationKey: ["license-approve"],
    mutationFn: (body: any) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify-license`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => res.json()),

    onSuccess: (data) => {
      setLoading("");
      if (!data.status) {
        toast.error(data.message ?? "Failed to approve license", {
          position: "top-right",
          richColors: true,
        });

        return;
      }

      // handle success
      toast.success("license approved ✅");
      queryClient.invalidateQueries({ queryKey: ["vendor-management"] });
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to approve license", {
        position: "top-right",
        richColors: true,
      });
    },
  });

  const userData = useMemo(() => {
    user.businessInfo.forEach((business) => {
      business.license.forEach((licenseType) => {
        // Filter out empty licenses
        if (licenseType.metrcLicense) {
          licenseType.metrcLicense = licenseType.metrcLicense.filter(
            (license) => license.license !== ""
          );
        }
        if (licenseType.cannabisLicense) {
          licenseType.cannabisLicense = licenseType.cannabisLicense.filter(
            (license) => license.license !== ""
          );
        }
      });
    });
    return user;
  }, [user]);

  type LicenseType = "businessLicense" | "cannabisLicense" | "metrcLicense";

  const handleApproveLicense = (
    licenseType: LicenseType,
    licenseId: string,
    businessInfoId: string,
    licenseGroupId: string,
    licenseIndex: number
  ) => {
    setLoading(licenseId);
    const data = {
      userId: user._id,
      businessInfoId,
      licenseId: licenseGroupId, // Using the license group ID instead of individual license ID
      licenseType,
      licenseIndex, // Using the correct index of the license in the array
    };

    console.log("Sending license approval data:", data);
    // api call
    approveLicense(data);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white h-auto w-[110px] rounded-lg shadow-[4px_4px_8px_0px_#0000000D,-4px_-4px_8px_0px_#0000000D]"
        >
          <DropdownMenuItem
            className=" text-left p-[8px] hover:bg-[#E6EEF6] cursor-pointer  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={() => setIsEditOpen(true)}
          >
            Check
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setIsDeleteOpen(true);
            }}
            className=" text-left p-[8px] text-red-600 cursor-pointer hover:bg-[#E6EEF6] rounded-b-[8px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <VeganModal open={isEditOpen} onOpenChange={setIsEditOpen} className="">
        <ScrollArea className="h-[70vh] w-full">
          <div className="space-y-6 ">
            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Full Name
                </h3>
                <p className="text-base font-semibold">{user.fullName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Email
                </h3>
                <p className="text-base">{user.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Business Name
                </h3>
                <p className="text-base">{user.businessName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Member Since
                </h3>
                <p className="text-base">{user.createdAt}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Industry
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user.industry.map((ind, i) => (
                    <Badge key={i} variant="outline">
                      {ind}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Profession
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user.profession.map((prof, i) => (
                    <Badge key={i} variant="outline">
                      {prof}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Verification Status:
              </h3>
              {user.isVerified ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                >
                  <AlertCircle className="h-3.5 w-3.5 mr-1" />
                  Pending
                </Badge>
              )}
            </div>

            {/* Business Information */}
            {userData.businessInfo.map((business, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">
                  Business Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Country
                    </h4>
                    <p>{business.country}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      States
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {business.state.map((st, i) => (
                        <Badge key={i} variant="outline">
                          {st}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Licenses */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Licenses</h3>

                  {business.license.map((licenseGroup, licenseIndex) => (
                    <div key={licenseIndex} className="border-0 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-left">
                        {licenseGroup.name}
                      </h4>

                      {/* Business Licenses */}
                      {licenseGroup &&
                        licenseGroup.businessLicense?.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-muted-foreground mb-2 text-left">
                              Business Licenses
                            </h5>
                            <div className="space-y-2">
                              {licenseGroup.businessLicense.map(
                                (license, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">
                                        {license.license}
                                      </span>
                                      {license.isVerified ? (
                                        <Badge className="bg-green-100 text-green-800">
                                          Verified
                                        </Badge>
                                      ) : (
                                        <Badge
                                          variant="outline"
                                          className="bg-yellow-100 text-yellow-800"
                                        >
                                          Pending
                                        </Badge>
                                      )}
                                    </div>
                                    {!license.isVerified && (
                                      <Button
                                        size="sm"
                                        onClick={() =>
                                          handleApproveLicense(
                                            "businessLicense",
                                            license._id,
                                            business._id,
                                            licenseGroup._id,
                                            i
                                          )
                                        }
                                        disabled={license._id === loading}
                                      >
                                        {license._id === loading
                                          ? "Processing..."
                                          : "Approve"}
                                      </Button>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {/* Cannabis Licenses */}
                      {licenseGroup &&
                        licenseGroup.cannabisLicense?.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-muted-foreground mb-2 text-left">
                              Cannabis Licenses
                            </h5>
                            <div className="space-y-2">
                              {licenseGroup.cannabisLicense.map(
                                (license, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">
                                        {license.license}
                                      </span>
                                      {license.isVerified ? (
                                        <Badge className="bg-green-100 text-green-800">
                                          Verified
                                        </Badge>
                                      ) : (
                                        <Badge
                                          variant="outline"
                                          className="bg-yellow-100 text-yellow-800"
                                        >
                                          Pending
                                        </Badge>
                                      )}
                                    </div>
                                    {!license.isVerified && (
                                      <Button
                                        size="sm"
                                        onClick={() =>
                                          handleApproveLicense(
                                            "cannabisLicense",
                                            license._id,
                                            business._id,
                                            licenseGroup._id,
                                            i
                                          )
                                        }
                                        disabled={license._id === loading}
                                      >
                                        {license._id === loading
                                          ? "Processing..."
                                          : "Approve"}
                                      </Button>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {/* Metrc Licenses */}
                      {licenseGroup &&
                        licenseGroup.metrcLicense?.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-muted-foreground mb-2 text-left">
                              Metrc Licenses
                            </h5>
                            <div className="space-y-2">
                              {licenseGroup.metrcLicense.map((license, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                      {license.license}
                                    </span>
                                    {license.isVerified ? (
                                      <Badge className="bg-green-100 text-green-800">
                                        Verified
                                      </Badge>
                                    ) : (
                                      <Badge
                                        variant="outline"
                                        className="bg-yellow-100 text-yellow-800"
                                      >
                                        Pending
                                      </Badge>
                                    )}
                                  </div>
                                  {!license.isVerified && (
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleApproveLicense(
                                          "metrcLicense",
                                          license._id,
                                          business._id,
                                          licenseGroup._id,
                                          i
                                        )
                                      }
                                      disabled={license._id === loading}
                                    >
                                      {license._id === loading
                                        ? "Processing..."
                                        : "Approve"}
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </VeganModal>

      {isDeleteOpen && (
        <section
          className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50 overflow-auto "
          onClick={() => setIsDeleteOpen(false)} // Close modal when clicking outside
        >
          <div
            className="relative w-[343px] md:w-[533px] bg-white rounded-[16px]  border  overflow-auto "
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Background overlay inside modal */}
            <div className="absolute rounded-[16px] opacity-50" />

            {/* Modal content */}
            <DeleteVendorModal
              vendorDetails={user}
              setIsOpen={setIsDeleteOpen}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default VendorAction;
