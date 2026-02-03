import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Home from '../app/page'
import { UIProvider } from '../contexts/UIContext'
import { LanguageProvider } from '../contexts/LanguageContext'

expect.extend(toHaveNoViolations)

// Mock IntersectionObserver & Canvas
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;
HTMLCanvasElement.prototype.getContext = jest.fn();

describe('Accessibility', () => {
    it('should have no accessibility violations in Home page', async () => {
        const { container } = render(
            <LanguageProvider>
                <UIProvider>
                    <Home />
                </UIProvider>
            </LanguageProvider>
        )

        // Run axe check
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})
