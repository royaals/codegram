
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const Contact = () => {
  return (
    <div>
      <section className="py-20 md:py-32" id="contact">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-gray-900 text-white rounded-lg shadow-md p-8 md:p-12">
            <div className="grid md:grid-cols-1 gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
                <p className="text-lg md:text-xl mb-8">Have questions or need help? Contact our team.</p>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input className="text-black" id="name"  type="text" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input className="text-black" id="email"  type="email" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea className="text-black"id="message" placeholder="How can we help you?" rows={4} />
                  </div>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </form>
              </div>
            
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
