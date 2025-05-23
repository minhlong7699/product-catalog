"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Eye, 
  Edit, 
  Trash2, 
  Search, 
  Plus, 
  Download, 
  Upload,
  Filter,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import type { Product, ProductVariant } from "@/app/types/product";
import { ProductDialog } from "@/components/admin/ProductDialog";




export default function AdminProductList() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");

  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const result = useQuery(api.products.getProducts, {
      paginationOpts: {  cursor: null ,numItems: 10 },
      category: undefined,
      minPrice: undefined,
      sortBy: undefined,
  });
    if (!result) return <div>Loading...</div>;
  
    const products = result.page;


  const categories = [...new Set(products.map((product) => product.category))];
  const brands = Array.from(new Set(products.map((p) => p.brand)));


  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDialogOpen(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsProductDialogOpen(true);
  };
  return (
    <div className="container mx-auto px-4 space-y-4">
      {/* Search and filters */}

      
      <div className="flex justify-end gap-2">      
        <Button onClick={handleAddProduct} >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                No products found. Try adjusting your search or filters.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className="h-12 w-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div>{product.title}</div>
                  <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
                </TableCell>
                <TableCell>
                  {product.salePrice ? (
                    <div>
                      <span className="line-through text-muted-foreground">${product.price}</span>
                      <span className="ml-2 font-semibold">${product.salePrice}</span>
                    </div>
                  ) : (
                    <span>${product.price}</span>
                  )}
                </TableCell>
                <TableCell>
                  {product.stock > 0 ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {product.stock} in stock
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Out of stock
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={product.isActive} 
                      onCheckedChange={() => console.log("Toggle status")}
                    />
                    <span>{product.isActive ? "Active" : "Inactive"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(product.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="outline" size="icon" onClick={() => handleEditProduct(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      

      <ProductDialog 
        open={isProductDialogOpen}
        onOpenChange={setIsProductDialogOpen}
        product={selectedProduct}
        onSave={() => {
          toast.success("Product saved successfully!");
          setIsProductDialogOpen(false);
        }}
      />
    </div>
  );
};