'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface PaymentFormData {
  phoneNumber: string
  dfsp: string
  accountId: string
  payeeName: string
  amount: string
}

export default function PaymentFlow() {
  const [step, setStep] = React.useState(1)
  const [formData, setFormData] = React.useState<PaymentFormData>({
    phoneNumber: '',
    dfsp: '',
    accountId: '',
    payeeName: '',
    amount: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDFSPChange = (value: string) => {
    setFormData((prev) => ({ ...prev, dfsp: value }))
  }

  const handleNext = () => {
    if (step === 1) {
      setFormData(prev => ({
        ...prev,
        accountId: 'Account 1',
        payeeName: 'Default Payee'
      }));
    }
    setStep((prev) => prev + 1);
  };

  const getFees = () => {
    return (parseFloat(formData.amount || '0') * 0.01).toFixed(2)
  }

  const getTotal = () => {
    return (parseFloat(formData.amount || '0') + parseFloat(getFees())).toFixed(2)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Type your Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label>DFSP List</Label>
                <Select value={formData.dfsp} onValueChange={handleDFSPChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select DFSP" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecobank">Ecobank</SelectItem>
                    <SelectItem value="bca">BCA</SelectItem>
                    <SelectItem value="bcn">BCN</SelectItem>
                    <SelectItem value="caixa">Caixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full"
                onClick={handleNext}
                disabled={!formData.phoneNumber || !formData.dfsp}
              >
                Send
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber2">Phone Number</Label>
                <Input
                  id="phoneNumber2"
                  value={formData.phoneNumber}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dfspName">DFSP name</Label>
                <Input
                  id="dfspName"
                  value={formData.dfsp}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountId">Account ID</Label>
                <Input
                  id="accountId"
                  name="accountId"
                  value={formData.accountId}
                  readOnly
                  placeholder="Account 1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payeeName">Payee Name</Label>
                <Input
                  id="payeeName"
                  name="payeeName"
                  value={formData.payeeName}
                  readOnly
                  placeholder="Enter payee name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Type the amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>
              <Button
                className="w-full"
                onClick={handleNext}
                disabled={!formData.amount}
              >
                Send
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Sending Amount</Label>
                <Input value={formData.amount} disabled />
              </div>
              <div className="space-y-2">
                <Label>Fees</Label>
                <Input value={getFees()} disabled />
              </div>
              <div className="space-y-2">
                <Label>Total</Label>
                <Input value={getTotal()} disabled />
              </div>
              <Button className="w-full" onClick={handleNext}>
                Confirm
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-center">Payment Successful!</h2>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

