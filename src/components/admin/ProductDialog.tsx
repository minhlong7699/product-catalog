import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Upload, X, ChevronUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product, ProductVariant } from "@/app/types/product";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSave: (product: Product) => void;
}


const emptyProduct: Product = {
  _id: "",
  title: "",
  description: "",
  price: 0,
  stock: 0,
  sku: "",
  category: "",
  brand: "",
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  imageUrl: "",
  images: [],
  tags: [],
  _creationTime: 0,
};

export const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  onOpenChange,
  product,
  onSave,
}) => {
  // State for the product form
  const [editedProduct, setEditedProduct] = useState<Product>(emptyProduct);
  // State for tag input
  const [tagInput, setTagInput] = useState("");
  // State for variants
  const [showVariants, setShowVariants] = useState(false);
  // State to track if form is submitted
  const [isSubmitted, setIsSubmitted] = useState(false);


  const createProduct = useMutation(api.products.createProduct.createProduct);
  const updateProduct = useMutation(api.products.updateProduct.updateProduct);
  const isCreateMode = product === null;
  // Initialize form with product data when opened
  useEffect(() => {
    if (product) {
      setEditedProduct(product);
    } else {
      setEditedProduct(emptyProduct);
    }
    setTagInput("");
    setIsSubmitted(false);
  }, [product, open]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "price" || name === "salePrice" || name === "stock") {
      setEditedProduct({
        ...editedProduct,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setEditedProduct({
        ...editedProduct,
        [name]: value,
      });
    }
  };

  // Handle checkbox/switch change
  const handleSwitchChange = (checked: boolean) => {
    setEditedProduct({
      ...editedProduct,
      isActive: checked,
    });
  };

  // Add a tag
  const handleAddTag = () => {
    if (tagInput.trim() && !editedProduct.tags.includes(tagInput.trim())) {
      setEditedProduct({
        ...editedProduct,
        tags: [...editedProduct.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  // Remove a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setEditedProduct({
      ...editedProduct,
      tags: editedProduct.tags.filter((tag: string) => tag !== tagToRemove),
    });
  };

  // Handle adding an image URL
  const handleAddImage = () => {
    const newImageUrl = window.prompt("Enter image URL:");
    if (newImageUrl) {
      const updatedImages = [...editedProduct.images, newImageUrl];
      setEditedProduct({
        ...editedProduct,
        images: updatedImages,
        imageUrl: editedProduct.imageUrl || newImageUrl,
      });
    }
  };

  // Set primary image
  const handleSetPrimaryImage = (imageUrl: string) => {
    setEditedProduct({
      ...editedProduct,
      imageUrl,
    });
  };

  // Remove image
  const handleRemoveImage = (imageUrlToRemove: string) => {
    const updatedImages = editedProduct.images.filter(
      (img: string) => img !== imageUrlToRemove
    );
    
    // If we're removing the primary image, set a new one if available
    let updatedPrimaryImage = editedProduct.imageUrl;
    if (imageUrlToRemove === editedProduct.imageUrl && updatedImages.length > 0) {
      updatedPrimaryImage = updatedImages[0];
    } else if (updatedImages.length === 0) {
      updatedPrimaryImage = "";
    }
    
    setEditedProduct({
      ...editedProduct,
      images: updatedImages,
      imageUrl: updatedPrimaryImage,
    });
  };

  // Move image up in the order
  const handleMoveImageUp = (index: number) => {
    if (index > 0) {
      const updatedImages = [...editedProduct.images];
      [updatedImages[index - 1], updatedImages[index]] = [
        updatedImages[index],
        updatedImages[index - 1],
      ];
      setEditedProduct({
        ...editedProduct,
        images: updatedImages,
      });
    }
  };

  // Move image down in the order
  const handleMoveImageDown = (index: number) => {
    if (index < editedProduct.images.length - 1) {
      const updatedImages = [...editedProduct.images];
      [updatedImages[index], updatedImages[index + 1]] = [
        updatedImages[index + 1],
        updatedImages[index],
      ];
      setEditedProduct({
        ...editedProduct,
        images: updatedImages,
      });
    }
  };

  // Handle variant management
  const handleAddVariant = () => {
    const currentVariants = editedProduct.variants || [];
    const newVariant: ProductVariant = {
      id: editedProduct._id,
      sku: `${editedProduct.sku}-VAR-${currentVariants.length + 1}`,
      color: "",
      size: "",
      stock: 0,
    };
    
    setEditedProduct({
      ...editedProduct,
      variants: [...currentVariants, newVariant],
    });
  };

  // Update variant
  const handleUpdateVariant = (
    index: number,
    field: keyof ProductVariant,
    value: string | number
  ) => {
    if (!editedProduct.variants) return;
    
    const updatedVariants = [...editedProduct.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: field === "stock" ? Number(value) : value,
    };
    
    setEditedProduct({
      ...editedProduct,
      variants: updatedVariants,
    });
  };

  // Remove variant
  const handleRemoveVariant = (index: number) => {
    if (!editedProduct.variants) return;
    
    const updatedVariants = [...editedProduct.variants];
    updatedVariants.splice(index, 1);
    
    setEditedProduct({
      ...editedProduct,
      variants: updatedVariants,
    });
  };

  // Form validation
  const isFormValid = () => {
    return (
      editedProduct.title.trim() !== "" &&
      editedProduct.sku.trim() !== "" &&
      editedProduct.price > 0
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    if (isFormValid()) {
      const updatedProduct = {
        ...editedProduct,
        updatedAt: new Date().toISOString(),
      };
      onSave({
        ...editedProduct,
        updatedAt: new Date().toISOString(),
      });


      try {
        if (isCreateMode) {

          const {
            _id,
            _creationTime,
            ...productWithoutId
          } = updatedProduct;
  
          await createProduct(productWithoutId);
        } else {

          const { _id,_creationTime,...rest } = editedProduct;

          await updateProduct({
            ...rest,
            id: _id as Id<"products">,
          });
        }
        onOpenChange(false);
      } catch (err) {
        console.error("Lỗi khi lưu sản phẩm:", err);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {product ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for this product. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-medium">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={editedProduct.title}
                    onChange={handleChange}
                    required
                    className={isSubmitted && !editedProduct.title.trim() ? "border-red-500" : ""}
                  />
                  {isSubmitted && !editedProduct.title.trim() && (
                    <p className="text-sm text-red-500">Product name is required</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku">
                    SKU <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="sku"
                    name="sku"
                    value={editedProduct.sku}
                    onChange={handleChange}
                    required
                    className={isSubmitted && !editedProduct.sku.trim() ? "border-red-500" : ""}
                  />
                  {isSubmitted && !editedProduct.sku.trim() && (
                    <p className="text-sm text-red-500">SKU is required</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editedProduct.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>

            {/* Pricing and Inventory */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pricing & Inventory</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Regular Price ($) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={editedProduct.price}
                    onChange={handleChange}
                    required
                    className={isSubmitted && editedProduct.price <= 0 ? "border-red-500" : ""}
                  />
                  {isSubmitted && editedProduct.price <= 0 && (
                    <p className="text-sm text-red-500">Price must be greater than zero</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="salePrice">Sale Price ($)</Label>
                  <Input
                    id="salePrice"
                    name="salePrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={editedProduct.salePrice || ""}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stock">Inventory Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={editedProduct.stock}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Categories and Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Categories & Details</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={editedProduct.brand}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <span>Active Status</span>
                    <Switch
                      checked={editedProduct.isActive}
                      onCheckedChange={handleSwitchChange}
                    />
                    <span className="text-sm text-muted-foreground">
                      {editedProduct.isActive ? "Active" : "Inactive"}
                    </span>
                  </Label>
                </div>
              </div>
            </div>

            {/* Image Management */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Product Images</h3>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleAddImage}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {editedProduct.images.length > 0 ? (
                  editedProduct.images.map((img: string, index: number) => (
                    <div 
                      key={index} 
                      className={`relative border rounded-md overflow-hidden ${
                        img === editedProduct.imageUrl ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="h-6 w-6"
                          onClick={() => handleRemoveImage(img)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white p-1 flex justify-between items-center text-xs">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 px-1 text-xs text-white hover:text-white"
                          onClick={() => handleSetPrimaryImage(img)}
                        >
                          {img === editedProduct.imageUrl ? "Primary" : "Set Primary"}
                        </Button>
                        <div className="flex">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-white hover:text-white"
                            onClick={() => handleMoveImageUp(index)}
                            disabled={index === 0}
                          >
                            <ChevronUp className="h-3 w-3" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-white hover:text-white"
                            onClick={() => handleMoveImageDown(index)}
                            disabled={index === editedProduct.images.length - 1}
                          >
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center border rounded-md h-32">
                    <p className="text-muted-foreground">No images added yet</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Tags */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-medium">Product Tags</h3>
              
              <div className="flex gap-2 items-center">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Enter tag..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                />
                <Button 
                  type="button" 
                  onClick={handleAddTag}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {editedProduct.tags.map((tag: string) => (
                  <Badge 
                    key={tag} 
                    variant="secondary"
                    className="flex items-center gap-1 py-1.5"
                  >
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
                {editedProduct.tags.length === 0 && (
                  <span className="text-sm text-muted-foreground">
                    No tags added yet
                  </span>
                )}
              </div>
            </div>

            {/* Product Variants */}
            <div className="space-y-4 md:col-span-2">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowVariants(!showVariants)}
              >
                <h3 className="text-lg font-medium">Product Variants</h3>
                <Button type="button" variant="ghost" size="sm">
                  {showVariants ? "Hide Variants" : "Show Variants"}
                </Button>
              </div>
              
              {showVariants && (
                <div className="space-y-4">
                  <Button 
                    type="button"
                    onClick={handleAddVariant}
                    size="sm"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Variant
                  </Button>
                  
                  {editedProduct.variants && editedProduct.variants.length > 0 ? (
                    <div className="space-y-4">
                      {editedProduct.variants.map((variant, index) => (
                        <div 
                          key={variant.id} 
                          className="border p-4 rounded-md space-y-4"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Variant #{index + 1}</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleRemoveVariant(index)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Remove
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <Label>SKU</Label>
                              <Input
                                value={variant.sku}
                                onChange={(e) => 
                                  handleUpdateVariant(index, "sku", e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>Color</Label>
                              <Input
                                value={variant.color || ""}
                                onChange={(e) => 
                                  handleUpdateVariant(index, "color", e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>Size</Label>
                              <Input
                                value={variant.size || ""}
                                onChange={(e) => 
                                  handleUpdateVariant(index, "size", e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>Stock</Label>
                              <Input
                                type="number"
                                min="0"
                                value={variant.stock}
                                onChange={(e) => 
                                  handleUpdateVariant(index, "stock", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No variants added. Click "Add Variant" to create product variations like different sizes or colors.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
