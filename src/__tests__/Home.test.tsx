import { render, screen } from '@testing-library/react'
import Home from '../app/page'
import { UIProvider } from '../contexts/UIContext'
import { LanguageProvider } from '../contexts/LanguageContext'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock canvas
HTMLCanvasElement.prototype.getContext = jest.fn();

describe('Home', () => {
    it('renders hero section', () => {
        // We need to wrap with providers because Home uses hooks
        render(
            <LanguageProvider>
                <UIProvider>
                    <Home />
                </UIProvider>
            </LanguageProvider>
        )

        // Check if name is present
        const headings = screen.getAllByRole('heading', { level: 1 })
        expect(headings[0]).toBeInTheDocument()
    })
})
